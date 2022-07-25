Vue.createApp({
    data(){
        return{
            users:[]
        }
    },
    methods:{
        getAllUserList(){
            axios
                // .get('trans_data.php')
                .get('json/data.json')  
                .then(response => {                    
                    this.users = response.data.result;
                    console.log(this.users);                  
                })
                .catch(error => {
                    console.log(error);
                })
        },
        deleteUser(id){
            console.log(this.users[id].name);
            axios                
                .post('deleteUser.php',{
                    id: this.users[id].id                
                })
                .then(response => {
                    // this.users = response.data[id].id;
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })                         
        },
    },
    mounted(){
         this.getAllUserList();
    }
}).mount('#users')