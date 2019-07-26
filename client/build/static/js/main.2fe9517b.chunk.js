(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{259:function(e,t,a){},260:function(e,t,a){},261:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(12),l=a.n(i),o=a(6),s=a(7),c=a(9),m=a(8),u=a(10),d=a(3),h=a(19),v=a(53),p=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).displayNavLinks=function(e){return localStorage.getItem("userId")||a.state.auth?r.a.createElement(v.elastic,Object.assign({isOpen:a.state.menuOpen,onStateChange:function(e){return a.handleStateChange(e)},right:!0,width:"200px"},e),r.a.createElement("ul",{id:"navbar-links"},r.a.createElement(d.b,{onClick:function(){return a.closeMenu()},to:"/dashboard"},r.a.createElement("li",null,"Dashboard")),r.a.createElement(d.b,{onClick:function(){return a.closeMenu()},to:"/about-us"},r.a.createElement("li",null,"About")),r.a.createElement(d.b,{onClick:function(){return a.closeMenu()},to:"/"},r.a.createElement("li",{onClick:a.props.handleLogout},"Logout")))):r.a.createElement(v.elastic,Object.assign({isOpen:a.state.menuOpen,onStateChange:function(e){return a.handleStateChange(e)},right:!0,width:"200px"},e),r.a.createElement("ul",{id:"navbar-links"},r.a.createElement(d.b,{onClick:function(){return a.closeMenu()},to:"/dashboard"},r.a.createElement("li",null,"Dashboard")),r.a.createElement(d.b,{onClick:function(){return a.closeMenu()},to:"/about-us"},r.a.createElement("li",null,"About"))))},a.state={auth:a.props.auth,menuOpen:!1},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"handleStateChange",value:function(e){this.setState({menuOpen:e.isOpen})}},{key:"closeMenu",value:function(){this.setState({menuOpen:!1})}},{key:"render",value:function(){return r.a.createElement(n.Fragment,null,r.a.createElement("nav",{className:"navbar"},r.a.createElement(d.b,{to:"/dashboard"},r.a.createElement("div",{id:"title-logo"})),this.displayNavLinks()))}}]),t}(n.Component),g=a(13),E=a.n(g),b=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).saveUserId=function(e){localStorage.setItem("userId",JSON.stringify(e[0].id)),localStorage.setItem("userName",JSON.stringify(e[0].username)),localStorage.setItem("newUser",JSON.stringify(e[1]))},a.handleChange=function(e){a.setState({username:e.target.value})},a.handleSubmit=function(e){e.preventDefault(),E.a.get("/login").query({data:a.state.username}).then(function(e){a.saveUserId(e.body),a.props.handleLogin(),a.props.history.push("/dashboard")}).catch(function(e){console.log(e)})},a.state={username:""},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(n.Fragment,null,r.a.createElement("div",{id:"login",className:"component-container"},r.a.createElement("h1",null,"Login"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",null,r.a.createElement("input",{id:"username-entry",type:"text",name:"username",value:this.state.username,placeholder:"Enter your username",onChange:this.handleChange,required:!0})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Submit"))),r.a.createElement("p",null,"* If you don't have an account, no worries; upon logging in a new account will be created for you.")))}}]),t}(n.Component),f=a(56),y=a.n(f),w=a(88),S=a(18),k=a(91),O=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).handleChange=function(e){a.setState({query:e.target.value})},a.handleSubmit=function(e){e.preventDefault(),a.props.history.push("/search/".concat(a.state.query))},a.handleTabChange=function(e){a.setState({activeIndex:e})},a.handleRecommended=function(e){return 1===parseInt(e.recommended)?r.a.createElement("i",{className:"far fa-thumbs-up"}):r.a.createElement("i",{className:"fas fa-thumbs-down"})},a.handleTweet=function(e,t){e.preventDefault();var a="Created On:".concat(t.created_on,"\n    Movie Title: ").concat(t.title,"\n    Rating:").concat(t.rating,"\n    Recommended:").concat(t.recommended,"\n    Review:").concat(t.review);E.a.post("/tweet").set("Content-Type","application/json").send({review:a}).then(function(e){console.log(e)}).catch(function(e){console.error(e)})},a.state={userId:null,userName:"",newUser:"",query:"",activeIndex:0,suggested:[],reviewedMovies:[],promiseIsResolved:!1},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=Object(w.a)(y.a.mark(function e(){var t,a,n,r;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!localStorage.getItem("userId")){e.next=18;break}return t=JSON.parse(localStorage.getItem("userId")),e.prev=2,e.next=5,E.a.get("/suggestions");case 5:return a=e.sent,e.next=8,E.a.get("/reviews").query({data:t});case 8:n=e.sent,r=this.props.match.params.tab?parseInt(this.props.match.params.tab):0,this.setState({reviewedMovies:n.body,suggested:a.body,userId:JSON.parse(localStorage.getItem("userId")),userName:JSON.parse(localStorage.getItem("userName")),newUser:JSON.parse(localStorage.getItem("newUser")),activeIndex:r,promiseIsResolved:!0}),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(2),console.error(e.t0);case 16:e.next=19;break;case 18:this.props.history.push("/");case 19:case"end":return e.stop()}},e,this,[[2,13]])}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return r.a.createElement(n.Fragment,null,e.state.promiseIsResolved?r.a.createElement("div",{id:"dashboard",className:"component-container"},r.a.createElement("img",{className:"profile-pic",src:"https://avatars.dicebear.com/v2/bottts/".concat(e.state.userId,".svg"),alt:"Profile"}),r.a.createElement("h1",null,"Welcome, ".concat(e.state.userName,"!!")),r.a.createElement("div",{id:"react-tab"},r.a.createElement(S.Tabs,{customStyle:k,activeIndex:e.state.activeIndex,onTabChange:e.handleTabChange},r.a.createElement(S.TabList,{className:"tab-list"},r.a.createElement(S.Tab,null,r.a.createElement("i",{className:"far fa-thumbs-up"})," Suggestions"),r.a.createElement(S.Tab,null,r.a.createElement("i",{className:"fas fa-film"})," Reviewed Movies")),r.a.createElement(S.PanelList,{className:"panel-list"},r.a.createElement(S.Panel,null,r.a.createElement("h2",null,"Suggested Movies"),r.a.createElement("ul",{className:"suggested-list"},e.state.suggested.map(function(e){return r.a.createElement("li",{key:e.movie_id},r.a.createElement("div",{className:"movie-poster"},r.a.createElement(d.b,{to:"/review/".concat(e.movie_id)},r.a.createElement("img",{src:e.image_url,alt:e.title}))),r.a.createElement("div",null,r.a.createElement(d.b,{to:"/review/".concat(e.movie_id)},r.a.createElement("h3",null,e.title)),r.a.createElement("p",{className:"synopsis"},e.synopsis)))}))),r.a.createElement(S.Panel,null,r.a.createElement("h2",null,"Reviewed Movies"),r.a.createElement("ul",{className:"movie-list"},e.state.reviewedMovies.map(function(t){return r.a.createElement("li",{key:t.id},r.a.createElement("div",{className:"review-poster"},r.a.createElement(d.b,{to:"/review/".concat(t.movie_id)},r.a.createElement("img",{src:t.image_url,alt:t.title}))),r.a.createElement("div",null,r.a.createElement(d.b,{to:"/review/".concat(t.movie_id)},r.a.createElement("h3",null,t.title.toUpperCase())),r.a.createElement("p",null,"Review: ",t.review),r.a.createElement("p",null,"Rating: ",t.rating),r.a.createElement("p",null,"Recommend: ",e.handleRecommended(t)),r.a.createElement("span",null,"Created: ",t.created_on," ",r.a.createElement("a",{href:"",onClick:function(a){return e.handleTweet(a,t)}},r.a.createElement("i",{onClick:function(a){return e.handleTweet(a,t)},className:"fab fa-twitter"})))))})))))),r.a.createElement("form",{onSubmit:e.handleSubmit},r.a.createElement("input",{type:"text",name:"query",value:e.state.query,placeholder:"Search for a movie",onChange:e.handleChange,required:!0}),r.a.createElement("button",{type:"submit"},r.a.createElement("i",{className:"fas fa-search"})))):null)}}]),t}(n.Component);a(255).config();var N=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={query:a.props.match.params.query,movies:[],promiseIsResolved:!1},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;E.a.get("/movies").query({data:this.state.query,url:"movies"}).then(function(t){e.setState({movies:t.body,promiseIsResolved:!0})}).catch(function(e){console.error(e)})}},{key:"render",value:function(){var e=this;return r.a.createElement(n.Fragment,null,r.a.createElement("div",{id:"Search",className:"component-container"},r.a.createElement("h1",null,"Search results"),e.state.promiseIsResolved?0===e.state.movies.length?r.a.createElement("div",null,r.a.createElement("p",null,"Sorry no movies were found."),r.a.createElement(d.b,{to:"/dashboard"},"Please Try again.")):r.a.createElement("ul",{className:"movie-list"},e.state.movies.map(function(e){return r.a.createElement("li",{key:e.movie_id},r.a.createElement("div",{className:"movie-poster"},r.a.createElement(d.b,{to:"/review/".concat(e.movie_id)},r.a.createElement("img",{src:e.image_url,alt:e.title}))),r.a.createElement("div",null,r.a.createElement(d.b,{to:"/review/".concat(e.movie_id)},r.a.createElement("h3",null,e.title)),r.a.createElement("p",{className:"synopsis"},e.synopsis)))})):null))}}]),t}(n.Component),C=a(59),j=(a(258),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).notify=function(){return Object(C.b)("Thanks for your review!",{autoClose:1500,position:"top-center"})},a.handleChangeReview=function(e){a.setState({review:e.target.value})},a.handleChangeRating=function(e){a.setState({rating:e.target.value})},a.handleSubmit=function(e){a.notify(),e.preventDefault();var t={user_id:localStorage.getItem("userId"),movie:{movie_id:a.state.movie_id,title:a.state.movie.title,synopsis:a.state.movie.synopsis,released_on:a.state.movie.released_on,image_url:a.state.movie.image_url},review:{text:a.state.review,rating:a.state.rating,recommended:a.state.recommended}};E.a.post("/review").set("Content-Type","application/json").send(t).then(function(e){setTimeout(function(){a.props.history.push("/dashboard/1")},1500)}).catch(function(e){console.error(e)})},a.thumbsUp=function(){a.setState({recommended:1,active:{like:"active",dislike:""}})},a.thumbsDown=function(){a.setState({recommended:0,active:{like:"",dislike:"active"}})},a.state={movie_id:a.props.match.params.movie_id,movie:{},review:"",rating:1,recommended:"",active:{like:"",dislike:""},redirect:!1},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;E.a.get("/search").query({data:this.state.movie_id,url:"search"}).then(function(t){e.setState({movie:t.body})}).catch(function(e){console.error(e)})}},{key:"render",value:function(){return r.a.createElement(n.Fragment,null,r.a.createElement("div",{id:"Review",className:"component-container"},r.a.createElement("section",{className:"movie-info"},r.a.createElement("div",{className:"movie-poster"},r.a.createElement("img",{src:this.state.movie.image_url,alt:this.state.movie.title})),r.a.createElement("div",null,r.a.createElement("h1",null,this.state.movie.title),r.a.createElement("h4",null,"Movie Synopsis: ".toUpperCase()),r.a.createElement("p",{id:"synopsis"},this.state.movie.synopsis))),r.a.createElement("form",{onSubmit:this.handleSubmit,className:"review-form"},r.a.createElement("h2",null,"Write your review"),r.a.createElement("textarea",{id:"review-text-box",rows:"6",cols:"45",value:this.state.review,onChange:this.handleChangeReview,required:!0}),r.a.createElement("div",null," Would you recommend this film to your friends? "),r.a.createElement("div",{className:"thumbsUpOrDown"},r.a.createElement("div",{className:"rating"},r.a.createElement("div",{className:"like grow"},r.a.createElement("i",{onClick:this.thumbsUp,className:"fa fa-thumbs-up fa-3x like ".concat(this.state.active.like),"aria-hidden":"true"})),r.a.createElement("div",{className:"dislike grow"},r.a.createElement("i",{onClick:this.thumbsDown,className:"fa fa-thumbs-down fa-3x like ".concat(this.state.active.dislike),"aria-hidden":"true"})))),r.a.createElement("select",{value:this.state.rating,onChange:this.handleChangeRating},r.a.createElement("option",{value:"1"},"1"),r.a.createElement("option",{value:"2"},"2"),r.a.createElement("option",{value:"3"},"3"),r.a.createElement("option",{value:"4"},"4"),r.a.createElement("option",{value:"5"},"5"),r.a.createElement("option",{value:"6"},"6"),r.a.createElement("option",{value:"7"},"7"),r.a.createElement("option",{value:"8"},"8"),r.a.createElement("option",{value:"9"},"9"),r.a.createElement("option",{value:"10"},"10")),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("button",{type:"submit"},"Save your review"),r.a.createElement(C.a,null))))}}]),t}(n.Component));function I(){return r.a.createElement(n.Fragment,null,r.a.createElement("div",{id:"AboutUs",className:"component-container"},r.a.createElement("h1",null,"Fluid Design"),r.a.createElement("p",null,"Fresh as the spring rain. Churning and thrashing as rapids. Swift as the stream. Patient as glacial runoff. Cool as the winter snow. Amorphous and changeable throughout. We are Fluid Design. #we'rethesmartgroup"),r.a.createElement("hr",null),r.a.createElement("img",{src:"https://avatars.dicebear.com/v2/bottts/janehur.svg",alt:"Jane"}),r.a.createElement("h2",null,"Jane Hur"),r.a.createElement("p",null,"A spellcaster from the Land of the Winds that trained with the Great Lakes Ancients, she still practices the old ways, hexing code into any shape imaginable and likely the one that most amuses her. Rightly feared by the Council of Guardians for the power of her code magic, she can bend any code base to her will."),r.a.createElement("a",{href:"https://github.com/janiekyu"},r.a.createElement("i",{className:"fab fa-github"},"Github")),r.a.createElement("hr",null),r.a.createElement("img",{src:"https://avatars.dicebear.com/v2/bottts/brandonhurrington.svg",alt:"Brandon"}),r.a.createElement("h2",null,"Brandon Hurrington"),r.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."," "),r.a.createElement("a",{href:"https://github.com/Kai-ros"},r.a.createElement("i",{className:"fab fa-github"},"Github")),r.a.createElement("hr",null),r.a.createElement("img",{src:"https://avatars.dicebear.com/v2/bottts/melfiperez.svg",alt:"Melfi"}),r.a.createElement("h2",null,"Melfi Perez"),r.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."," "),r.a.createElement("a",{href:"https://github.com/perezm27"},r.a.createElement("i",{className:"fab fa-github"},"Github")),r.a.createElement("hr",null),r.a.createElement("img",{src:"https://avatars.dicebear.com/v2/bottts/mattstuhring.svg",alt:"Matt"}),r.a.createElement("h2",null,"Matt Stuhring"),r.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."," "),r.a.createElement("a",{href:"https://github.com/mattstuhring"},r.a.createElement("i",{className:"fab fa-github"},"Github"))))}var x=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).handleLogout=function(){localStorage.clear(),a.setState({auth:!1})},a.handleLogin=function(){a.setState({auth:!0})},a.state={auth:!1},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(d.a,null,r.a.createElement(n.Fragment,null,r.a.createElement(p,{auth:this.state.auth,handleLogout:this.handleLogout}),r.a.createElement(h.c,null,r.a.createElement(h.a,{exact:!0,path:"/",render:function(t){return r.a.createElement(b,Object.assign({},t,{handleLogin:e.handleLogin}))}}),r.a.createElement(h.a,{path:"/dashboard/:tab?",component:O}),r.a.createElement(h.a,{path:"/search/:query",component:N}),r.a.createElement(h.a,{path:"/review/:movie_id",component:j}),r.a.createElement(h.a,{path:"/about-us",component:I}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(259),a(260);l.a.render(r.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},94:function(e,t,a){e.exports=a(261)}},[[94,1,2]]]);
//# sourceMappingURL=main.2fe9517b.chunk.js.map