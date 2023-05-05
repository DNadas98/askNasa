function standardElement(tagName, id, className, content) {
  return `
    <${tagName} ${id ? `id='${id}'` : ''} ${className ? `class='${className}'` : ''}}>
      ${content ? content : ''}
    </${tagName}>`;
}

async function fetchData(date) {
  const apiKey = 'XZO7DCC0EUq1hhKHw8fQbbAJSezRzXPFmKXehwtC';
  const url = `https://api.nasa.gov/planetary/apod?${date ? `date=${date}&` : ''}api_key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      referrerPolicy: 'no-referrer',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from NASA API:\n${error.message}`);
    return error.message;
  }
}

function displayContent(data) {
  const contentSection = document.getElementById('contentSection');
  contentSection.innerHTML = '';

  if (data.media_type === 'image') {
    const imgElement = document.createElement('img');
    imgElement.src = data.url;
    imgElement.alt = data.title;
    contentSection.appendChild(imgElement);
  } else if (data.media_type === 'video') {
    const videoElement = document.createElement('iframe');
    videoElement.src = data.url;
    videoElement.allowFullscreen = false;
    contentSection.appendChild(videoElement);
  }

  const titleElement = document.createElement('h2');
  titleElement.textContent = data.title;

  const explanationElement = document.createElement('p');
  explanationElement.textContent = data.explanation;

  contentSection.appendChild(titleElement);
  contentSection.appendChild(explanationElement);
}

async function askNasa(date) {
  try {
    const data = await fetchData(date);
    displayContent(data);
    console.clear();
  } catch (error) {
    console.error(`Error fetching data from NASA API:\n${error.message}`);
  }
}

function insertMenuButton(id, text, onClickFn) {
  const menuSection = document.getElementById('menuSection');
  menuSection.insertAdjacentHTML('beforeend', standardElement('button', id, 'menuButton', text));
  document.getElementById(id).addEventListener('click', onClickFn);
}

function insertDateInput() {
  const menuSection = document.getElementById('menuSection');
  const now = getDate(new Date());
  menuSection.insertAdjacentHTML(
    'beforeend',
    `<input type='date' id='dateInput' value='${now}' min='1995-06-16' max='${now}'>`
  );
  document.getElementById('dateInput').addEventListener('change', async (event) => {
    if (new Date(event.target.value) >= new Date('1995-06-16') && new Date(event.target.value) <= new Date()) {
      await askNasa(event.target.value);
    }
  });
}
function getDate(currentDate) {
  const year = currentDate.getFullYear().toString();
  const month =
    currentDate.getMonth() + 1 > 9
      ? (currentDate.getMonth() + 1).toString()
      : '0' + (currentDate.getMonth() + 1).toString();
  const day = currentDate.getDate() > 9 ? currentDate.getDate().toString() : '0' + currentDate.getDate().toString();
  return `${year}-${month}-${day}`;
}

function loadHeader(rootEl) {
  const header = document.createElement('header');
  rootEl.insertAdjacentElement('afterbegin', header);
  header.insertAdjacentHTML('beforeend', `<h1 id="pageTitle">Ask NASA</h1>`);
  header.insertAdjacentHTML('beforeend', standardElement('section', 'menuSection'));
  insertMenuButton('todayButton', "Today's date", async () => {
    await askNasa();
  });
  insertMenuButton('videoButton', 'Video example', async () => {
    await askNasa('2022-05-29');
  });
  insertMenuButton('minButton', 'First data', async () => {
    await askNasa('1995-06-16');
  });
  insertDateInput();
}

function loadEvent() {
  const rootEl = document.getElementById('root');
  loadHeader(rootEl);
  rootEl.insertAdjacentHTML('beforeend', standardElement('section', 'contentSection'));
  document.getElementById('todayButton').click();
}
window.addEventListener('load', loadEvent);
