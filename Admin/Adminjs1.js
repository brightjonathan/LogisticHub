/* ===== PAGE SWITCHING ===== */
const menuLinks = document.querySelectorAll('#sidebar a[data-page]');
const pages = document.querySelectorAll('.page');

menuLinks.forEach(link => {
	link.addEventListener('click', e => {
		e.preventDefault();

		const pageId = link.dataset.page;

		// Active menu
		menuLinks.forEach(i => i.parentElement.classList.remove('active'));
		link.parentElement.classList.add('active');

		// Show page
		pages.forEach(p => p.classList.remove('active'));
		document.getElementById(pageId).classList.add('active');
	});
});

/* ===== SIDEBAR TOGGLE ===== */
const menuBar = document.querySelector('.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', () => {
	sidebar.classList.toggle('hide');
});

/* ===== SEARCH ===== */
const searchBtn = document.querySelector('.search-btn');
// const searchIcon = searchBtn.querySelector('.bx');
const searchForm = document.querySelector('nav form');

// searchBtn.addEventListener('click', e => {
// 	if (window.innerWidth < 576) {
// 		e.preventDefault();
// 		searchForm.classList.toggle('show');
// 		searchIcon.classList.toggle('bx-search');
// 		searchIcon.classList.toggle('bx-x');
// 	}
// });

/* ===== RESPONSIVE ===== */
if (window.innerWidth < 768) sidebar.classList.add('hide');

/* ===== DARK MODE ===== */
const switchMode = document.getElementById('switch-mode');
// switchMode.addEventListener('change', () => {
// 	document.body.classList.toggle('dark', switchMode.checked);
// });
