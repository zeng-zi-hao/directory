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
            console.log(this.users[id]);
            axios                
                .post('deleteUser.php',{
                    id: this.users[id].id                
                })
                    .then(response => {                         
                        this.getAllUserList()
                        console.log('刪除 id',this.users[id].id, 'name: ',this.users[id].name);                            
                    })
                    .catch(error => {
                        console.log('錯誤:',error); 
                })      
        },
    },
    mounted(){
         this.getAllUserList();
    }
}).mount('#users')