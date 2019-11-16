const IMAGE_URL = 'https://joeschmoe.io/api/local/';
const USER_POST = 'https://jsonplaceholder.typicode.com/posts';
const USER_INFO = 'https://jsonplaceholder.typicode.com/users';

async function createCard() {
	//var
	let boxUsers = [];
	let infoUser = [];
	/// design
	let contenido = document.createElement('div');
	let card = document.createElement('div');
	let img = document.createElement('img');
	let container = document.createElement('div');
	let contentImg = document.createElement('div');
	let h4 = document.createElement('h4');
	let p = document.createElement('p');
	contenido.classList.add('contenido');
	contentImg.classList.add('content-img');
	card.classList.add('card');
	container.classList.add('container');
	img.classList.add('image');
	h4.classList.add('titleName');
	img.alt = 'Avatar';
	card.appendChild(contentImg);
	contentImg.appendChild(img);
	contentImg.appendChild(h4);
	card.appendChild(container);
	container.appendChild(p);
	/// design

	let id;

	await fetch(USER_POST)
		.then(response => response.json())
		.then(users => users.map(user => boxUsers.push(user)));

	await fetch(USER_INFO)
		.then(response => response.json())
		.then(users => users.map(user => infoUser.push(user)));

	const post = infoUser.map(bu => bu.id);
	id = boxUsers.filter(iu => post.includes(iu.id));

	var main = _(infoUser)
		.concat(id)
		.groupBy('id')
		.map(_.spread(_.curry(_.merge, {})))
		.value();

	main.map(user => {
		console.log(user);
		img.src = `${IMAGE_URL}${user.username}`;
		h4.innerHTML = user.name;
		p.innerHTML = user.body;
		const card2 = card.cloneNode(true);
		contenido.appendChild(card2);
	});

	return document.body.appendChild(contenido);
}

createCard();
