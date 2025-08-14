document.addEventListener("DOMContentLoaded",function(){
    const searchButton = document.getElementById("search-btn");
    const userInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".esay-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardyProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");

    //return true or false based on regex
    function validateUsername(username){
        if(username.trim()===""){
            alert("username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid username");
        }
        return isMatching;
    }
    async function fetchUserDetails(username){
        // const url = `https://leetcode-stats-api.herokuapp.com/${username}}`
        try{
            searchButton.textContent = "Searching...";
            searchButton.disable = true;
            // const respone = await fetch(url);
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
            const targetUrl = 'https://leetcocde.com/graphql/';
            const myHeaders = new Headers();
            myHeaders.append("content-type","application/json");

            const graphql = JSON.stringify({
                query:"\n userSessionProgress($username:String!) {\n allquestionscount{\n difficulty\n count\n}\n matchedUser(username:$username){\nsubmitstats {\n acSubmissionNum {\ndiffculty\n count\n submission\n}\n totalSubmissionNum{\n difficulty\n count\n submission\n    }\n }\n}\n ",
                variables:{"username":`${username}`}
            })
            const requestOptions = {
                method:"POST",
                headers:myHeaders,
                body:graphql,
                redirect:"follow"
            };

            const response = await fetch(proxyUrl+targetUrl,requestOptions);
            if(!response.ok){
                throw new Error("Unable to fetch user detailes");
            }
            // const url = `https://leetcode.com/graphql`

            const parsedata = await response.json();
            console.log("logging data",data);
            displayUserData(parsedata);
        }
        catch(error){
            statsContainer.innerHTML = `<p>No data found<p/>`
        }
        finally{
            searchButton.textContent = "search";
            searchButton.disable = false;
        }
    }

    function displayUserData(data){

    }

    searchButton.addEventListener('click',function(){
        const username = usernameInput.value;
        console.log("Logging username",username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })
})