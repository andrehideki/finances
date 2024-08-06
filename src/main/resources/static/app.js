import IndexPage from "./pages/index_page.js";
import EntrySavePage from "./pages/entry_save_page.js";
import Menu from "./components/menu.js";

const routes = {
    '/': IndexPage,
    '/page/entry': EntrySavePage,
    '/page/entry/{id}': EntrySavePage,
}

const app = Vue.createApp({
	data() {
		return {
			currentPath: window.location.hash
		}
	},
	components: {
		IndexPage,
		EntrySavePage,
		Menu
	},
	computed: {
		currentView() {
	      	let route = routes[this.currentPath.slice(1) || '/'];
			console.log(route)
			if (route) return route;
			
			const routesWithParms = Object.keys(routes)
				.filter(key => {
					return key.match("\{.+\}") && 
					(this.currentPath.slice(1) || '/').includes(key.replace(/{[^}]*}/g, ""))
				})
				
			return routes[routesWithParms]
	    }
	},
	mounted() {
	    window.addEventListener('hashchange', () => {
			console.log("hash",  window.location.hash)
		  	this.currentPath = window.location.hash
		})
  	},
	template: `
		<Menu />
		<div>
			<component :is="currentView" />
		</div>
	`
});

app.mount("#app");



