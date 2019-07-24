(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{238:function(e,t,a){},239:function(e,t,a){},240:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(16),l=a.n(i),o=a(7),c=a(8),s=a(10),m=a(9),u=a(11),d=a(2),v=a(17);function h(){return r.a.createElement(n.Fragment,null,r.a.createElement("nav",{className:"navbar"},r.a.createElement(d.b,{to:"/"},r.a.createElement("div",{id:"title-logo"})),r.a.createElement("ul",{id:"navbar-links"},r.a.createElement(d.b,{to:"/dashboard"},r.a.createElement("li",null,"Dashboard")),r.a.createElement(d.b,{to:"/search"},r.a.createElement("li",null,"Search")),r.a.createElement(d.b,{to:"/review"},r.a.createElement("li",null,"Review")),r.a.createElement(d.b,{to:"/about-us"},r.a.createElement("li",null,"About")))))}var p=a(12),E=a.n(p),g=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).saveUserId=function(e){localStorage.setItem("userId",JSON.stringify(e.id)),localStorage.setItem("userName",JSON.stringify(e.username))},a.handleChange=function(e){a.setState({username:e.target.value})},a.handleSubmit=function(e){e.preventDefault(),E.a.get("/login").query({data:a.state.username}).then(function(e){console.log("result body: ",e.body),a.saveUserId(e.body),a.props.history.push("/dashboard")}).catch(function(e){console.log(e)})},a.state={username:""},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(n.Fragment,null,r.a.createElement("div",{id:"login",className:"component-container"},r.a.createElement("h1",null,"Login"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",null,r.a.createElement("input",{type:"text",name:"username",value:this.state.username,placeholder:"Enter your username",onChange:this.handleChange,required:!0})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Submit")))))}}]),t}(n.Component),b=a(51),f=a.n(b),y=a(83),w=a(15),S=a(86),q=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).handleChange=function(e){a.setState({query:e.target.value})},a.handleSubmit=function(e){e.preventDefault(),a.props.history.push("/search/".concat(a.state.query))},a.handleTabChange=function(e){a.setState({activeIndex:e})},a.state={userId:null,userName:"",query:"",activeIndex:0,suggested:[],reviewedMovies:[]},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=Object(y.a)(f.a.mark(function e(){var t,a,n;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!localStorage.getItem("userId")){e.next=17;break}return t=JSON.parse(localStorage.getItem("userId")),e.prev=2,e.next=5,E.a.get("/suggestions");case 5:return a=e.sent,e.next=8,E.a.get("/reviews").query({data:t});case 8:n=e.sent,this.setState({reviewedMovies:n.body,suggested:a.body,userId:JSON.parse(localStorage.getItem("userId")),userName:JSON.parse(localStorage.getItem("userName"))}),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(2),console.error(e.t0);case 15:e.next=18;break;case 17:this.props.history.push("/");case 18:case"end":return e.stop()}},e,this,[[2,12]])}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement(n.Fragment,null,r.a.createElement("div",{id:"dashboard",className:"component-container"},r.a.createElement("img",{className:"profile-pic",src:"https://avatars.dicebear.com/v2/bottts/".concat(this.state.userId,".svg"),alt:"Profile"}),r.a.createElement("h1",null,"Welcome, ".concat(this.state.userName,"!!")),r.a.createElement("div",{id:"react-tab"},r.a.createElement(w.Tabs,{customStyle:S,activeIndex:this.state.activeIndex,onTabChange:this.handleTabChange},r.a.createElement(w.TabList,{className:"tab-list"},r.a.createElement(w.Tab,null,r.a.createElement("i",{className:"far fa-thumbs-up"})," Suggestions"),r.a.createElement(w.Tab,null,r.a.createElement("i",{className:"fas fa-film"})," Movies")),r.a.createElement(w.PanelList,{className:"panel-list"},r.a.createElement(w.Panel,null,r.a.createElement("h2",null,"Suggested Movies"),r.a.createElement("ul",{className:"suggested-list"},this.state.suggested.map(function(e){return r.a.createElement("li",{key:e.movie_id},r.a.createElement("div",{className:"movie-poster"},r.a.createElement(d.b,{to:"/review/".concat(e.movie_id)},r.a.createElement("img",{src:e.image_url}))),r.a.createElement("div",null,r.a.createElement(d.b,{to:"/review/".concat(e.movie_id)},r.a.createElement("h3",null,e.title)),r.a.createElement("p",{className:"synopsis"},e.synopsis)))}))),r.a.createElement(w.Panel,null,r.a.createElement("h2",null,"Reviewed Movies"),r.a.createElement("ul",{className:"movie-list"},this.state.reviewedMovies.map(function(e){return r.a.createElement("li",{key:e.id},r.a.createElement("div",{className:"review-poster"},r.a.createElement(d.b,{to:"/review/".concat(e.movie_id)},r.a.createElement("img",{src:e.image_url}))),r.a.createElement("div",null,r.a.createElement(d.b,{to:"/review/".concat(e.movie_id)},r.a.createElement("h3",null,e.title)),r.a.createElement("p",null,"Review: ",e.review),r.a.createElement("p",null,"Rating: ",e.rating)))})))))),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("input",{type:"text",name:"query",value:this.state.query,placeholder:"Search for a movie",onChange:this.handleChange,required:!0}),r.a.createElement("button",{type:"submit"},r.a.createElement("i",{className:"fas fa-search"})))))}}]),t}(n.Component);a(235).config();var N=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).state={query:a.props.match.params.query,movies:[]},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;E.a.get("/movies").query({data:this.state.query,url:"movies"}).then(function(t){e.setState({movies:t.body})}).catch(function(e){console.error(e)})}},{key:"render",value:function(){return r.a.createElement(n.Fragment,null,r.a.createElement("div",{id:"Search",className:"component-container"},r.a.createElement("h1",null,"Search results"),r.a.createElement("ul",{className:"movie-list"},this.state.movies.map(function(e){return r.a.createElement("li",{key:e.movie_id},r.a.createElement("div",{className:"movie-poster"},r.a.createElement(d.b,{to:"/review/".concat(e.movie_id)},r.a.createElement("img",{src:e.image_url,alt:e.title}))),r.a.createElement("div",null,r.a.createElement(d.b,{to:"/review/".concat(e.movie_id)},r.a.createElement("h3",null,e.title)),r.a.createElement("p",{className:"synopsis"},e.synopsis)))}))))}}]),t}(n.Component),O=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).handleChangeReview=function(e){a.setState({review:e.target.value})},a.handleChangeRating=function(e){a.setState({rating:e.target.value})},a.handleSubmit=function(e){e.preventDefault();var t={user_id:localStorage.getItem("userId"),movie:{movie_id:a.state.movie_id,title:a.state.movie.title,synopsis:a.state.movie.synopsis,released_on:a.state.movie.released_on,image_url:a.state.movie.image_url},review:{text:a.state.review,rating:a.state.rating,recommended:"0"}};console.log("data",t),E.a.post("/review").set("Content-Type","application/json").send(t).then(function(e){a.props.history.push("/dashboard")}).catch(function(e){console.error(e)})},a.state={movie_id:a.props.match.params.movie_id,movie:{},review:"",rating:1},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;E.a.get("/search").query({data:this.state.movie_id,url:"search"}).then(function(t){e.setState({movie:t.body})}).catch(function(e){console.error(e)})}},{key:"render",value:function(){return r.a.createElement(n.Fragment,null,r.a.createElement("div",{id:"Review",className:"component-container"},r.a.createElement("section",{className:"movie-info"},r.a.createElement("div",{className:"movie-poster"},r.a.createElement("img",{src:this.state.movie.image_url,alt:this.state.movie.title})),r.a.createElement("div",null,r.a.createElement("h1",null,this.state.movie.title),r.a.createElement("h4",null,"Movie Synopsis: "),r.a.createElement("p",{className:"synopsis"},this.state.movie.synopsis))),r.a.createElement("form",{onSubmit:this.handleSubmit,className:"review-form"},r.a.createElement("h2",null,"Review Notes"),r.a.createElement("textarea",{rows:"6",cols:"45",value:this.state.review,onChange:this.handleChangeReview}),r.a.createElement("p",null,"SLIDER GOES HERE"),r.a.createElement("select",{value:this.state.rating,onChange:this.handleChangeRating},r.a.createElement("option",{value:"1"},"1"),r.a.createElement("option",{value:"2"},"2"),r.a.createElement("option",{value:"3"},"3"),r.a.createElement("option",{value:"4"},"4"),r.a.createElement("option",{value:"5"},"5"),r.a.createElement("option",{value:"6"},"6"),r.a.createElement("option",{value:"7"},"7"),r.a.createElement("option",{value:"8"},"8"),r.a.createElement("option",{value:"9"},"9"),r.a.createElement("option",{value:"10"},"10")),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("button",{type:"submit"},"Save your review"))))}}]),t}(n.Component);function j(){return r.a.createElement(n.Fragment,null,r.a.createElement("div",{id:"AboutUs",class:"component-container"},r.a.createElement("h1",null,"Fluid Design"),r.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),r.a.createElement("hr",null),r.a.createElement("img",{src:"https://avatars.dicebear.com/v2/bottts/janehur.svg"}),r.a.createElement("h2",null,"Jane Hur"),r.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "),r.a.createElement("hr",null),r.a.createElement("img",{src:"https://avatars.dicebear.com/v2/bottts/brandonhurrington.svg"}),r.a.createElement("h2",null,"Brandon Hurrington"),r.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "),r.a.createElement("hr",null),r.a.createElement("img",{src:"https://avatars.dicebear.com/v2/bottts/melfiperez.svg"}),r.a.createElement("h2",null,"Melfi Perez"),r.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "),r.a.createElement("hr",null),r.a.createElement("img",{src:"https://avatars.dicebear.com/v2/bottts/mattstuhring.svg"}),r.a.createElement("h2",null,"Matt Stuhring"),r.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ")))}var x=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).state={},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(d.a,null,r.a.createElement(n.Fragment,null,r.a.createElement(h,null),r.a.createElement(v.c,null,r.a.createElement(v.a,{exact:!0,path:"/",component:g}),r.a.createElement(v.a,{path:"/dashboard",component:q}),r.a.createElement(v.a,{path:"/search/:query",component:N}),r.a.createElement(v.a,{path:"/review/:movie_id",component:O}),r.a.createElement(v.a,{path:"/about-us",component:j}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(238),a(239);l.a.render(r.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},89:function(e,t,a){e.exports=a(240)}},[[89,1,2]]]);
//# sourceMappingURL=main.eca75451.chunk.js.map