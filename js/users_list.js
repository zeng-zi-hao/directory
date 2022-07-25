Vue.createApp({
    data(){
        return{
            users:[]
        }
    },
    methods:{
        deleteUser(id){
            // console.log(this.users[id]);
            axios                
                .post('deleteUser.php',{
                    id: this.users[id].id,                    
                })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })                         
        },
    },
    mounted(){
        axios
            .get('trans_data.php') 
            .then(response => {
                this.users = response.data.result;
                console.log(this.users);                  
            })
            .catch(error => {
                console.log(error);
            }) 
    }
}).mount('#users')