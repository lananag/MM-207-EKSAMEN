        let subContainer = document.getElementById('subContainer'); // HTML id referance
        let languages = document.getElementById('languages'); // HTML id referance
        let Language = "english"; // default language
        let language = {}; // Global variable for store of language data

        languages.addEventListener('change', async function () {
            Language = languages.value;
            language = await getLanguage(Language); // Update the global variable
            loadWelcomePage();
        });
        // Define async function getLanguage that fetches language data from  server
        async function getLanguage(Language) {
            try{
                //store chosen langauge in variable
                let chosenLanguage = Language;
                //making language data url for the chosen language
                let url = "/language?language=" + chosenLanguage;
                //define configuration for html request
                let cfg = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
                // GET request to server to recieve langauge data
                let response = await fetch(url, cfg);
                let data = await response.json();
                if (response.status != 200) {
                    throw data.error;
                } 
                return data; //returning language data
            } catch (error) {
              
            } //error occur if there's problem in fetching language data
        }


        async function loadWelcomePage() {
            language = await getLanguage(Language);

            subContainer.innerHTML = ""; // Clear previous content
            // display and welcome header
            let h1 = document.createElement('h1');
            h1.innerHTML = language.h1WelcomeText;
            subContainer.appendChild(h1);
            // display and welcome paragraph
            let p = document.createElement('p');
            p.innerHTML = language.pWelcomeText;
            subContainer.appendChild(p);
            // display and register button
            let showRegister = document.createElement('button');
            showRegister.innerHTML = language.buttonregistertext;
            showRegister.addEventListener('click', function () {
                loadRegisterPage();
            });
            subContainer.appendChild(showRegister);
            // display and "show login" button
            let showLogin = document.createElement('button');
            showLogin.innerHTML = language.buttonlogintext;
            showLogin.addEventListener('click', function () {
                loadLoginPage();
            });
            subContainer.appendChild(showLogin);
        }

        loadWelcomePage(); //loading welcome page!


        // - Register Page - //
        function loadRegisterPage() {
            subContainer.innerHTML = ""; // Clear previous content

            let br = document.createElement('br');
            // create h1 and display text from language file
            let h1 = document.createElement('h1');
            h1.innerHTML = language.h1WelcomeText;
            subContainer.appendChild(h1);
            // create and display paragraph for registration
            let p = document.createElement('p');
            p.innerHTML = language.pregistertext;
            subContainer.appendChild(p);
            // create and display input field for username 
            let input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('id', 'username');
            input.setAttribute('name', 'username');
            input.setAttribute('placeholder', language.registerusernameplaceholder);
            subContainer.appendChild(input);
            subContainer.appendChild(br);
            // create and display input field for password
            let input2 = document.createElement('input');
            input2.setAttribute('type', 'password');
            input2.setAttribute('id', 'password');
            input2.setAttribute('name', 'password');
            input2.setAttribute('placeholder', language.registerpasswordplaceholder);
            subContainer.appendChild(input2);
            subContainer.appendChild(br);
            // create and display input field for confirming password
            let input3 = document.createElement('input');
            input3.setAttribute('type', 'password');
            input3.setAttribute('id', 'password2');
            input3.setAttribute('name', 'password2');
            input3.setAttribute('placeholder', language.registerpassword2placeholder);
            subContainer.appendChild(input3);
            subContainer.appendChild(br);
            
            // create and display a button for registration
            let button = document.createElement('button');
            button.innerHTML = language.buttonregistertext;
            // creating click addeventlistener for register button
            button.addEventListener('click', async function () {
                let username = document.getElementById('username').value;
                let password = document.getElementById('password').value;
                let password2 = document.getElementById('password2').value;
                // checking if password matches
                if (password != password2) {
                    p.innerHTML = language.passwordsdontmatch;
                    return;
                }
                //check if the username length is ok
                if (username.length < 3) {
                    p.innerHTML = language.usernametooshort;
                    return;
                }
                // check if the password length is ok 
                if (password.length < 5) {
                    p.innerHTML = language.passwordtooshort;
                    return;
                }
                // check if the username contains colon
                if (username.includes(":")) {
                result.innerHTML = language.usernameerrorcolon;
                return;
                }
                // getting ready register request
                try{
                    let url = "/register";

                    let credString = createCredentialString(username, password);

                    
                    let cfg = {
                        method: "POST",
                        headers: {
                            "content-Type": "application/json",
                            "authorization": credString
                        }
                    };
                    // waiting for the server to configurate the registration request
                    let response = await fetch(url, cfg);
                    let data = await response.json();

                    if (response.status != 200) { //if error
                    throw data.error;
                }
                // show succeeded registration message and load to login page
                p.innerHTML = language.registered;
                setTimeout(function () {
                    loadLoginPage();
                }, 1000);

            } catch (error) {
                // show error message if error occured during registration  
                p.innerHTML = error;
            }
        });
        // appending register button
        subContainer.appendChild(button);
    }

    // - Login Page - //
    function loadLoginPage() {
        subContainer.innerHTML = ""; // Clear previous content

        let br = document.createElement('br');
    
        let h1 = document.createElement('h1');
        h1.innerHTML = language.h1WelcomeText;
        subContainer.appendChild(h1);
    
        let p = document.createElement('p');
        p.innerHTML = language.plogintext;
        subContainer.appendChild(p);
        // input field for username
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'username');
        input.setAttribute('name', 'username');
        input.setAttribute('placeholder', language.registerusernameplaceholder);
        subContainer.appendChild(input);
        subContainer.appendChild(br);
        //Input field for password
        let input2 = document.createElement('input');
        input2.setAttribute('type', 'password');
        input2.setAttribute('id', 'password');
        input2.setAttribute('name', 'password');
        input2.setAttribute('placeholder', language.registerpasswordplaceholder);
        subContainer.appendChild(input2);
        subContainer.appendChild(br);
        // login button
        let button = document.createElement('button');
        button.innerHTML = language.buttonlogintext;
        // click event for login  button
        button.addEventListener('click', async function () {
            let username = document.getElementById('username').value;
            let password = document.getElementById('password').value;

            try{
                //  login request
                let url = "/login";

                let credString = createCredentialString(username, password);

                let cfg = {
                    method: "POST",
                    headers: {
                        "content-Type": "application/json",
                        "authorization": credString
                    }
                };
                //sending to server
                let response = await fetch(url, cfg);
                let data = await response.json();

    
                // error for login fail
                if (response.status != 200) {
                    throw data.error;
                }
                //storing token in localStorage after login succeeded 
                p.innerHTML = language.loggedin;
                localStorage.setItem("token", data.token);
                //user being sent to the correct page
                setTimeout(function () {
                    if (data.message == "Admin logged in.") {
                        loadAdminPage();
                    } else {
                        loadTodoPage();
                    }
                }, 1000);               


            } catch (error) {
  
            p.innerHTML = error;
            }
        });
        //login button
        subContainer.appendChild(button);
    }

    // a basic credential auth string 
    function createCredentialString(username, password) {
        let combinedStr = username + ":" + password;
        let b64Str = btoa(combinedStr);
        return "basic " + b64Str;
    }





    // ------------------ TODO PAGE ------------------ //


    function loadTodoPage() {
        subContainer.innerHTML = ""; // Clear previous content
        // header
        let h1 = document.createElement('h1');
        h1.innerHTML = language.h1TodoText;
        subContainer.appendChild(h1);
        //paragraph
        let p = document.createElement('p');
        p.innerHTML = language.pTodoText;
        subContainer.appendChild(p);

        loadTodoInput();    //input field
        loadToDoItems();    //todo items
    }




    // --- load TO-DO input --- //
    function loadTodoInput() {
        subContainer.innerHTML = ""; // Clear previous content

        let div = document.createElement('div');
        div.id = "createItemDiv";

        let h1 = document.createElement('h1');
        h1.innerHTML = language.h1TodoText;
        div.appendChild(h1);
        
        let p = document.createElement('p');
        p.innerHTML = language.pTodoText;
        div.appendChild(p);
        //textarea
        let textarea = document.createElement('textarea');
        textarea.setAttribute('id', 'todo');
        textarea.setAttribute('name', 'todo');
        textarea.setAttribute('placeholder', language.todoplaceholder);
        div.appendChild(textarea);

        //due date 
        let duedate = document.createElement('input');
        duedate.setAttribute('type', 'date');
        duedate.setAttribute('id', 'duedate');
        duedate.setAttribute('name', 'duedate');
        div.appendChild(duedate);

        let button = document.createElement('button');
        button.innerHTML = language.buttonaddtext;
        // adding eventlistener, click bringing text and date from input and sends to function postItem
        button.addEventListener('click', function () {
            let text = document.getElementById('todo').value;
            let duedate = document.getElementById('duedate');
            let chosenDueDate = duedate.value;
            postItem(text, chosenDueDate);
        });

        div.appendChild(button);
        subContainer.appendChild(div);
    }



    // --- post TO-DO item --- //
    async function postItem(text, duedate) {

        let p = document.getElementById('message');


        
        try{
            let url = "/todo";
            //http method, header, request body
            let cfg = {
                method: "POST",
                headers: {
                    "content-Type": "application/json", //json format
                    "authorization": localStorage.getItem("token")  //adding authtoken from localstorage
                },
                body: JSON.stringify({
                    "item": text,
                    "duedate": duedate
                })
            };
            //post request to server with info from input
            let response = await fetch(url, cfg);
            let data = await response.json();

            if (response.status != 200) { //if error
            throw data.error;
            }

            p.innerHTML = language.added;
                loadTodoPage();

        } catch (error) {

            p.innerHTML = error;
        }
    }



        
    // --- load TO-DO items --- //
    async function loadToDoItems(){

        let pmessage = document.createElement('p');
        pmessage.id = "message";
        subContainer.appendChild(pmessage);

        try {
            // url for todo 
            let url = "/todo";

            let cfg = {
                method: "GET",
                headers: {
                    "content-Type": "application/json",
                    "authorization": localStorage.getItem("token")
                }
            };
            //sending get request to server to fetch item
            let response = await fetch(url, cfg);
            let data = await response.json();
  

            if (response.status != 200) { //if error
                throw data.error;
                
            }    
            // making div for to-do items
            let div = document.createElement('div');
            div.id = "itemDiv";

            let h1 = document.createElement('h1');
            h1.innerHTML = language.h1TodoText;
            // getting fetch data and inserting each item
            data.forEach(function (item) {

                let itemId = item.id;
                // making div for each item
                let div = document.createElement('div');
                div.id = itemId;
                div.className = "item";


                let date = new Date(item.duedate);
                let dateStr = date.toLocaleDateString();

                let p = document.createElement('p');
                let datep = document.createElement('p');
                datep.innerHTML = dateStr;
                p.innerHTML = item.text;
                div.appendChild(datep);
                div.appendChild(p);
                // add, create button for delete and update
                let button = document.createElement('button');
                button.innerHTML = language.buttondeletetext;
                button.addEventListener('click', function () {
                    deleteItem(itemId);
                });

                div.appendChild(button);

                let button2 = document.createElement('button');
                button2.innerHTML = language.buttonupdatetext;
                button2.addEventListener('click', function () {
                    showUpdate(itemId, item.text, item.duedate);
                });

                div.appendChild(button2);

                subContainer.appendChild(div);

            });

            subContainer.appendChild(div);

        } catch (error) {
  
            pmessage.innerHTML = error;
        }
    }
    //deleting element 
    async function deleteItem(itemId) {

        let pmessage = document.getElementById('message');

        try{
            let url = "/todo/" + itemId;
          
            let cfg = {
                method: "DELETE",
                headers: {
                    "content-Type": "application/json",
                    "authorization": localStorage.getItem("token")
                }
            };
            // sending delete request to server, with the id of the item that the user wants to delete
            let response = await fetch(url, cfg);
            let data = await response.json();

            if (response.status != 200) { //if error
            throw data.error;
            }

            pmessage.innerHTML = language.deleted;
            setTimeout(function () {
                loadTodoPage();
            }, 1000);


        } catch (error) {

            pmessage.innerHTML = error;
        }
    }

    function showUpdate(itemId, text, duedate) {
        // getting messsage
        let pmessage = document.getElementById('message');
        // getting item id
        let div = document.getElementById(itemId);
        //display input for the text area for updated
        let input = document.createElement('textarea');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'editTodo');
        input.setAttribute('name', 'editTodo');
        input.value = text;
        div.appendChild(input);
        // due date edit
        let dateInput = document.createElement('input');
        dateInput.setAttribute('type', 'date');
        dateInput.setAttribute('id', 'editDuedate');
        dateInput.setAttribute('name', 'editDuedate');

        let dateOnly = duedate.split("T")[0];  // Extracting only the date part
        dateInput.value = dateOnly;

        div.appendChild(dateInput);


        let button3 = document.createElement('button');
        button3.innerHTML = language.buttonupdatetext;

        button3.addEventListener('click', async function () {
            postUpdate(itemId);
        });

        div.appendChild(button3);

    }

    // function bringing input value from item id, changes then sending updated info to server
    async function postUpdate(itemId) {

        let pmessage = document.getElementById('message');

        try{

            let newTodo = document.getElementById('editTodo').value;
            let newDuedate = document.getElementById('editDuedate').value;

        
            let url = "/todo/" + itemId;
         
            let cfg = {
                method: "PUT",
                headers: {
                    "content-Type": "application/json",
                    "authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({
                    "item": newTodo,
                    "dueDate": newDuedate
                })
            };

            let response = await fetch(url, cfg);
            let data = await response.json();
            // if changes occur, sending to db
            if (response.status != 200) { //if error
            throw data.error;
            }

            pmessage.innerHTML = language.updated;
            setTimeout(function () {
                loadTodoPage();
            }, 1000);
            // if error occured, error message will show
        } catch (error) {

            pmessage.innerHTML = error;
        }
    }


    // --- Admin --- //

    async function loadAdminPage() {
        subContainer.innerHTML = ""; // Clear previous content

        let h1 = document.createElement('h1');
        h1.innerHTML = language.h1AdminText;
        subContainer.appendChild(h1);
        
        let p = document.createElement('p');
        p.innerHTML = language.pAdminText;
        subContainer.appendChild(p);

        let pmessage = document.createElement('p');
        pmessage.id = "message";
        subContainer.appendChild(pmessage);

        try{
            //preparing config req
            let url = "/admin";
          
            let cfg = {
                method: "GET",
                headers: {
                    "content-Type": "application/json",
                    "authorization": localStorage.getItem("token")
                }
            };
            // GET req to server
            let response = await fetch(url, cfg);
            let data = await response.json();
   

            
            if (response.status != 200) {
            throw data.error;
            }
                //going throught users and users data 
             data.forEach(function (member) {

                let memberId = member.id;
                // display list of members 
                let div = document.createElement('div');
                div.id = memberId;
                div.className = "memberList";

                let p = document.createElement('p');
                p.innerHTML = member.username;
                div.appendChild(p);
                // button to delete each registered user 
                let button = document.createElement('button');
                button.innerHTML = language.buttondeleteusertext;
                button.addEventListener('click', function () {
                   deleteMember(memberId);
                });

                div.appendChild(button);

                subContainer.appendChild(div);

            });


        } catch (error) {
  
        }
    }

    // sending delete request to the server with id of the user you want to delete 
    async function deleteMember(memberId) {

        let pmessage = document.getElementById('message');

        try{
            let url = "/admin/" + memberId;
         
            let cfg = {
                method: "DELETE",
                headers: {
                    "content-Type": "application/json",
                    "authorization": localStorage.getItem("token")
                }
            };

            let response = await fetch(url, cfg);
            let data = await response.json();


            // if delete isn't succeeded, error message will show
            if (response.status != 200) { 
                throw data.error;            
            }

            pmessage.innerHTML = language.deletedMember;
            setTimeout(function () {
                loadAdminPage();
            }, 1000);

        } catch (error) {
            pmessage.innerHTML = error;
        }
    }