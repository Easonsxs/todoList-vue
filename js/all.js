var app = new Vue({
    el: '#app',
    data: {
        newTodo: '', //input輸入的內容
        todos: [{
            id: '234', //每一個代辦事項獨有的id
            title: '你好，歡迎使用TODO LIST', //代辦事項的內容
            completed: false //事項是否完成
        }],
        visibility: 'all', // 自定義data物件內的特性 表示頁籤
        cacheTodo:{},     //預存todo的地方
        cacheTitle:''     //預存編輯title的地方
    },
    methods: {
        // 新增todo list
        addTodo: function() {
            var value = this.newTodo.trim(); //去除字串頭尾空白字
            var timestamp = Math.floor(Date.now());
            // console.log(value,timestamp);
            if (!value) { return };
            // 若value沒有值，就停止執行
            this.todos.push({
                id: timestamp,
                title: value,
                completed: false
            });
            // 新增物件至todos陣列裡，id為timestamp，title為value，預設為false
            this.newTodo = '';
            // 新增完成之後將input輸入欄清空
        },
        // 刪除列表
        removeTodo: function(todo) {
            var newIndex = '';
            var vm = this;
            vm.todos.forEach(function(item,key){
                if(todo.id == item.id){
                    newIndex = key
                }
            });

            this.todos.splice(newIndex, 1);
            // 刪除陣列裡面的資料，傳入索引值

        },
        // 將項目預存
        editTodo: function(item){
            console.log(item);
            this.cacheTodo = item; //把帶進來的item放進cacheTodo
            this.cacheTitle = item.title; //把item的title放進cacheTitle
        },
        // 清除編輯
        clearEdit:function(){
            this.cacheTodo = {};
        },
        doneEdit:function(item){
            item.title = this.cacheTitle; //將標題等於input輸入的值
            this.cacheTitle = ''; //再將預存標題清空
            this.cacheTodo = {}; //再清除整個cacheTodo，畫面才會變回正常(因為id不一樣了)
        },
        clearAll:function(){
            this.todos = [];
        }
    },
    computed: {
        // 過濾後的待辦事項，並把v-for的地方換成filterTodo
        filterTodo: function() {
            if (this.visibility == 'all') {
                // visibility是all 就回傳todos
                return this.todos;
            } else if (this.visibility == 'active') {
                // 若visibility是active
                var newTodos = []; //建立新空陣列
                this.todos.forEach(function(item) {
                    // 從todos撈出completed == false的item放進新的空陣列
                    if (item.completed == false) {
                        newTodos.push(item);
                    }
                });
                return newTodos; //回傳新生成的陣列
            } else if (this.visibility == 'complete') {
                var newTodos = [];
                this.todos.forEach(function(item) {
                    if (item.completed == true) {
                        newTodos.push(item);
                    }
                });
                return newTodos;
            }
            return this.todos;
        },
        // 顯示任務數量
        message:function(){
            return this.todos.length;
        }

    }
});



