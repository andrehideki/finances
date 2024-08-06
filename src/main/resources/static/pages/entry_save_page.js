export default {
	
	data() {
		const id = (window.location.hash || '/')
			.replace("#/page/entry", "")
			.replace("/", "") || "";
			
	    return {
		  id: id,
	      name: "",
	      type: "EXPENSE",
	      description: "",
		  date: "",
	      value: 0,
	    }
	 },
	 
	 async created() {
		if (this.id) {
			const response = await axios.get(`/entry/${this.id}`);
			const {name, description, date, value, type} = response.data;
			this.name = name;
			this.description = description;
			this.value = value;
			this.type = type;
			this.date = date;
		}
	 },
	  
	methods: {
		async saveEntry() {
			try {
				if (!!this.id) {
					await axios.put(`/entry/${this.id}`, {
						id: this.id,
						name: this.name,
						type: this.type,
						description: this.description,
						date: this.date,
						value: this.value
					});
					Swal.mixin({
					  toast: true,
					  position: "top-end",
					  showConfirmButton: false,
					  timer: 3000,
					  timerProgressBar: true,
					  didOpen: (toast) => {
					    toast.onmouseenter = Swal.stopTimer;
					    toast.onmouseleave = Swal.resumeTimer;
					  }
					}).fire({
						icon: "success",
					  	title: "Successfully updated"
					});
				}
				else {
					await axios.post(`/entry`, {
						name: this.name,
						type: this.type,
						description: this.description,
						date: this.date,
						value: this.value
					});
					
					this.name = "";
					this.description = "";
					this.value = "";
					this.type = "";
					this.date = "";
					
					Swal.mixin({
					  toast: true,
					  position: "top-end",
					  showConfirmButton: false,
					  timer: 3000,
					  timerProgressBar: true,
					  didOpen: (toast) => {
					    toast.onmouseenter = Swal.stopTimer;
					    toast.onmouseleave = Swal.resumeTimer;
					  }
					}).fire({
						icon: "success",
					  	title: "Successfully registered"
					});
				}
				
			} catch (error) {
				console.error('Error fetching transactions:', error);
			}
		},
  	},
	template: `
		<div class="p-2">
		<a href="#/">Back</a>
		<article class="card">
		<form @submit.prevent="saveEntry"
			class="flex gap-2 flex-col w-3/5"
			autocomplete="off"
		>
			<input type="hidden" id="id" v-model="id" />
	  	    <div class="flex gap-1 flex-col">
				<label>Name</label>
				<input id="name" v-model="name" />
			</div>
	  	    <div class="flex gap-1 flex-col">
				<label>Date</label>
				<input type="date" id="date" v-model="date" />
			</div>
			<div class="flex gap-1 flex-col">
				<label>Type</label>
				<label>
					<input type="radio" v-model="type" id="typeEXPENSE" name="type"value="EXPENSE" />
					Expense
				</label>
				<label>
					<input type="radio" v-model="type" id="typeREVENUE" name="type" value="REVENUE" />
					Revenue
				</label>
			</div>
	  	    <div  class="flex gap-1 flex-col">
				<label>Value</label>
				<input id="value" v-model="value" />
			</div>
	  	    <div  class="flex gap-1 flex-col">
				<label>Description</label>
				<textarea id="description" v-model="description" />
			</div>
			<footer>
	  	    	<button type="submit"
					class="p-2"
				>Save</button>
			</footer>
      </form>
	  </article>
	  </div>
  `
}