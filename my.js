const APIURL = 'https://api.github.com/users/';
const mein = document.getElementById('mein');
const form = document.getElementById('form');
const search = document.getElementById('search');


async function getUser(username) {
    try{
        const { data } = await axios(APIURL +
        username);
        createUserCard(data);
        getRepos(username);
    }
    catch(err){
        if(err.response.status == 404){
            createErrCard('no profile this username');
        };
    };
};

async function getRepos(username){
    try{
        const { data } = await axios(APIURL +
        username + '/repos');
        addReposToCard(data);
    }
    catch(err){
        if(err.response.status == 404){
            createErrCard('no profile this username');
        };
    }
}

function createErrCard(msg){
    const cardHTML =`
        <div class='card'>
            <h1>${msg}</h1>
        </div>
    `
    mein.innerHTML = cardHTML;
};

function createUserCard(user) {
    const cardHTML = `
    <div class="card"> 
    <div> 
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
   <div class="user-info">
    <h2>${user.name}</h2>
    <p>${user.bio}</p>
    
    <ul>
        <li>${user.followers}<strong>Follovers</strong></li>
        <li>${user.following}<strong>Folloving</strong></li>
        <li>${user.public_repos}<strong>Repos</strong></li>
    </ul>
        <div id="repos"></div>
    </div>
</div>
    `
    mein.innerHTML = cardHTML;
};

function addReposToCard(repos){
    const reposEl = document.getElementById('repos');
    repos
        .slice(0,5)
        .forEach(repo =>{
            const repoEl = document.createElement('a');
            repoEl.classList.add('repo');
            repoEl.href = repo.html_url;
            repoEl.target = '_blank';
            repoEl.innerText = repo.name;
            reposEl.appendChild(repoEl);
        });
};
// input submit function
form.addEventListener('submit',(e) =>{
    e.preventDefault();
    const user = search.value;
    if(user){
        getUser(user)
        search.value = ''
    };
});

// placeholder simple animation
let fSpeed = 0;
let placeholder = "";
const plachTxt = "Search github user";
const speed = 100;

function plchAnimate() {
    placeholder += plachTxt.charAt(fSpeed);
    // this search for inp id
    search.setAttribute("placeholder",placeholder);
    fSpeed++;
    setTimeout(plchAnimate, speed);
};
plchAnimate();