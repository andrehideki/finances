export default {
	data() {
	    return {
	      name: "",
		  type: "",
		  yearMonth: `${new Date().getFullYear()}-${String(new Date().getUTCMonth() + 1).padStart(2, '0')}`,
	      entries: []
	    }
	},
	
	created() {
		this.getEntries();
    },
	  
	methods: {
		async getEntries() {
			try {
				const response = await axios.get('/entry', {
					params: {
						name: this.name,
						type: this.type,
						yearMonth: this.yearMonth 
		            }
				});
				this.entries = response.data;
			} catch (error) {
				console.error('Error fetching transactions:', error);
			}
		},
		
		async deleteEntry(id) {
			const result = await Swal.fire({
	  			title: "Confirm delete?",
				icon: "question",
	  			showCancelButton: true,
	  			confirmButtonText: "Delete",
			});
			
			if (!result.isConfirmed) return;
			
			try {
				await axios.delete(`/entry/${id}`);
				await this.getEntries();
				
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
				  	title: "Successfully deleted"
				});
			} catch (error) {
				console.error('Error fetching transactions:', error);
			}
		},
		
		async updateEntry(id) {
			window.history.pushState({}, "", `#/page/entry/${id}`);
			window.dispatchEvent(new Event("hashchange"));
		}
	},
  	template: `
		<main class="p-2">
		<article class="card">
		  	<form @submit.prevent="getEntries"
				class="flex gap-2 content-center items-center"
				autocomplete="off"
			>
		  	    <input type="text" v-model="name" id="name" placeholder="Name" />
				<div>
					<input type="month" v-model="yearMonth" id="yearMonth" />
				</div>
				<div>
					<label class="cursor-pointer">
						<input type="radio" v-model="type" id="typeAll" name="type" value="" />
						All
					</label>
					<label  class="cursor-pointer">
						<input type="radio" v-model="type" id="typeEXPENSE" name="type"value="EXPENSE" />
						Expense
					</label>
					<label>
						<input type="radio" v-model="type" id="typeREVENUE" name="type" value="REVENUE" />
						Revenue
					</label>
				</div>
		  	    <button type="submit"
					class="p-1"
				>Search</button>
		    </form>
		</article>
		
		<article class="card mt-2">
		  	<table class="table-auto">
				<thead class="text-xs text-gray-700 uppercase bg-gray-50">
					<tr>
						<th class="px-6 py-2">Name</th>
						<th>Description</th>
						<th>Type</th>
						<th>Date</th>
						<th>Value</th>
						<th></th>
					</tr>
				</thead>
		  		<tbody>
		  			<tr v-for="entry in entries"
						class="bg-white border-b even:bg-slate-50"
					>
		  				<td class="px-6 py-2">{{ entry.name }}</td>
		  				<td>{{ entry.description }}</td>
		  				<td>{{ entry.type }}</td>
		  				<td>{{ entry.date }}</td>
		  				<td>{{ entry.value }}</td>
						<td>
							<div class="flex gap-2 content-center items-center">
								<button @click="deleteEntry(entry.id)"
									class="bg-rose-500 text-white rounded px-1"
								>Delete</button>
								<button @click="updateEntry(entry.id)"
									class="bg-indigo-500 text-white rounded px-1"
								>Update</button>
							</div>
						</td>						
		  			</tr>	
		  		</tbody>
		  	</table>
		</article>
  		</main>
  `
}