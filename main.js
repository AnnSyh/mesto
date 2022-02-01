(()=>{"use strict";var e={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__btn",inactiveButtonClass:"form__submit_inactive",inputErrorClass:"popup__input_type-error",errorClass:"popup__input-error_active"};function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var n=function(){function e(t,n,r,o,i,u,c,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._card=u,this._text=u.name,this._link=u.link,this._owner=u.owner._id,this._id=u._id,this._likes=u.likes,this._template=t,this._handleCardClick=n,this._handleConfirmDelete=r,this._openConfirm=o,this._closeConfirm=i,this._user=c,this._api=a,this._confirmBtn=document.querySelector(".confirmation-btn")}var n,r;return n=e,(r=[{key:"_createView",value:function(){this._view=this._template.content.querySelector(".cards__item").cloneNode(!0)}},{key:"_handleCardLikes",value:function(){var e=this;this._heart.classList.toggle("cards__heart_active"),this._likes.some((function(t){return t._id==e._user}))?this._api.deleteLike(this._id).then((function(t){e._heart.classList.remove("cards__heart_active"),e._counter.textContent=t.likes.length,e._likes=t.likes})).catch((function(e){return console.log("WASTED - ".concat(e))})):this._api.postLike(this._id).then((function(t){e._heart.classList.add("cards__heart_active"),e._counter.textContent=t.likes.length,e._likes=t.likes})).catch((function(e){return console.log("WASTED - ".concat(e))}))}},{key:"setEventListeners",value:function(){var e=this;this._image.addEventListener("click",(function(){return e._handleCardClick(e._text,e._link)})),this._trash.addEventListener("click",(function(){return e._handleConfirmDelete()})),this._heart.addEventListener("click",(function(){return e._handleCardLikes()}))}},{key:"_isLiked",value:function(e){var t=this;e._likes.forEach((function(e){e._id==t._user?t._heart.classList.add("cards__heart_active"):t._heart.classList.remove("cards__heart_active")}))}},{key:"render",value:function(){return this._createView(),this._btn=this._view.querySelector(".confirmation-btn"),this._image=this._view.querySelector(".cards__img"),this._trash=this._view.querySelector(".cards__trash"),this._heart=this._view.querySelector(".cards__heart"),this._title=this._view.querySelector(".cards__title"),this._counter=this._view.querySelector(".cards__heart-counter"),this._likesSelector=this._view.querySelector(".cards__heart-counter"),this._title.innerText=this._text,this._image.alt=this._text,this._image.src=this._link,this._likesSelector.textContent=this._likes.length,this.setEventListeners(),this._owner==this._user||(this._trash=this._view.querySelector(".cards__trash").classList.add("hidden")),this._isLiked(this),this._view}}])&&t(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),e}();function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=o((function e(t,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),i(this,"_showInputError",(function(e){var t=r._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(r._inputErrorClass),t.textContent=e.validationMessage,t.classList.add(r._errorClass)})),i(this,"_hideInputError",(function(e){var t=r._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(r._inputErrorClass),t.classList.remove(r._errorClass),t.textContent=""})),i(this,"_checkInputValidity",(function(e){e.validity.valid?r._hideInputError(e):r._showInputError(e)})),i(this,"_setEventListeners",(function(){r._formElement.addEventListener("submit",(function(e){e.preventDefault()})),r._inputList.forEach((function(e){e.addEventListener("input",(function(){r._checkInputValidity(e),r.toggleButtonState()}))}))})),i(this,"enableValidation",(function(){r._setEventListeners()})),i(this,"_hasInvalidInput",(function(){return Array.from(r._inputList).some((function(e){return!e.validity.valid}))})),i(this,"_hasEmptyInput",(function(){return r._inputList.some((function(e){return e.validity.valueMissing}))})),i(this,"resetValidation",(function(){r._formElement.reset(),r.toggleButtonState(),r._inputList.forEach((function(e){r._hideInputError(e)}))})),i(this,"toggleButtonState",(function(){var e=r._formElement.checkValidity();r._submitButton.classList.toggle(r._inactiveButtonClass,!e),r._submitButton.disabled=!e})),this._configData=t,this._formElement=n,t.formSelector;var o=t.inputSelector,u=t.submitButtonSelector,c=t.inactiveButtonClass,a=t.inputErrorClass,s=t.errorClass;this._submitButton=this._formElement.querySelector(u),this._inactiveButtonClass=c,this._inputErrorClass=a,this._errorClass=s,this._inputList=this._formElement.querySelectorAll(o)}));function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t,n){var r=t.data,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderedItems=r,this._renderer=o,this._container=n}var t,n;return t=e,n=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t._renderer(e)}))}},{key:"addItem",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"append";this._container[t](e)}}],n&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=t,this._close=this._popup.querySelector(".popup__close"),this._overlay=this._popup.querySelector(".popup__overlay"),this._submit=this._popup.querySelector(".popup__btn"),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"openPopup",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"closePopup",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this._close.addEventListener("click",(function(t){return e.closePopup(t)})),this._overlay.addEventListener("click",(function(t){return e.closePopup(t)}))}},{key:"_handleEscClose",value:function(e){"Escape"==e.key&&this.closePopup()}}])&&s(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function h(){return h="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=_(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},h.apply(this,arguments)}function _(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=v(e)););return e}function y(e,t){return y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},y(e,t)}function d(e,t){if(t&&("object"===f(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function v(e){return v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},v(e)}var m=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&y(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=v(r);if(o){var n=v(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return d(this,e)});function u(e,t,n){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(r=i.call(this,e))._img=r._popup.querySelector(".popup__img"),r._title=r._popup.querySelector(".popup__caption"),r._text=t,r._link=n,r}return t=u,(n=[{key:"openPopup",value:function(e,t){h(v(u.prototype),"openPopup",this).call(this),this._title.innerText=e,this._img.alt=e,this._img.src=t}}])&&p(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(l);function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function w(){return w="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=S(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},w.apply(this,arguments)}function S(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=O(e)););return e}function E(e,t){return E=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},E(e,t)}function k(e,t){if(t&&("object"===b(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return P(e)}function P(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function O(e){return O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},O(e)}var C=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&E(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=O(r);if(o){var n=O(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return k(this,e)});function u(e,t){var n,r,o,c;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),c=function(e){n._handleFormSubmit(e,n.getInputValues())},(o="_handler")in(r=P(n=i.call(this,e)))?Object.defineProperty(r,o,{value:c,enumerable:!0,configurable:!0,writable:!0}):r[o]=c,n._form=n._popup.querySelector(".form"),n._inputList=n._form.querySelectorAll(".popup__input"),n._handleFormSubmit=t,n}return t=u,(n=[{key:"getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"setEventListeners",value:function(){w(O(u.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",this._handler)}}])&&g(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(l);function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}function L(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function q(){return q="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=x(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},q.apply(this,arguments)}function x(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=I(e)););return e}function R(e,t){return R=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},R(e,t)}function T(e,t){if(t&&("object"===j(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return A(e)}function A(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function I(e){return I=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},I(e)}var B=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&R(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=I(r);if(o){var n=I(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return T(this,e)});function u(e,t){var n,r,o,c;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),c=function(e){n._handleFormSubmit(e,n._getInputValues())},(o="_handler")in(r=A(n=i.call(this,e)))?Object.defineProperty(r,o,{value:c,enumerable:!0,configurable:!0,writable:!0}):r[o]=c,n._form=n._popup.querySelector("form"),n._handleFormSubmit=t,n}return t=u,(n=[{key:"setEventListeners",value:function(){q(I(u.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",this._handler)}}])&&L(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(l);function D(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var V=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userNameSelector=t,this._userAboutSelector=n,this._userAvatarSelector=document.querySelector(".profile__img"),this._containerProfileName=document.querySelector("."+this._userNameSelector),this._containerProfileJob=document.querySelector("."+this._userAboutSelector)}var t,n;return t=e,n=[{key:"getUserInfo",value:function(){return{name:this._containerProfileName.textContent,about:this._containerProfileJob.textContent}}},{key:"getUserAvatar",value:function(){return{avatar:this._userAvatarSelector.src}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.about;this._containerProfileName.textContent=t,this._containerProfileJob.textContent=n}},{key:"setUserAvatar",value:function(e){this._userAvatarSelector.src=e}}],n&&D(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function U(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var N,J,W=function(e){return e.ok?e.json():Promise.reject("Something went wrong!")},F=function(){function e(t){var n=t.url,r=t.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._url=n,this._headers=r}var t,n;return t=e,n=[{key:"getUser",value:function(){return fetch("".concat(this._url,"/users/me"),{headers:this._headers,body:JSON.stringify()}).then(W)}},{key:"getInitialCards",value:function(){return fetch("".concat(this._url,"/cards"),{headers:this._headers}).then(W)}},{key:"postUser",value:function(e){return fetch("".concat(this._url,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify(e)}).then(W)}},{key:"postAvatar",value:function(e){return fetch("".concat(this._url,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e["avatar-src"]})}).then(W)}},{key:"postCreateCard",value:function(e){return fetch("".concat(this._url,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify(e)}).then(W)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._url,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then(W)}},{key:"postLike",value:function(e){return fetch("".concat(this._url,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers}).then(W)}},{key:"deleteLike",value:function(e){return fetch("".concat(this._url,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then(W)}}],n&&U(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function M(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function H(e,t,n){return H=z()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&$(o,n.prototype),o},H.apply(null,arguments)}function z(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function $(e,t){return $=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},$(e,t)}var G=document.querySelector(".confirmation__popup"),K=document.querySelector(".open-img__popup"),Q=K.querySelector(".popup__img"),X=K.querySelector(".popup__caption"),Y=document.querySelector(".list-template-place"),Z=document.querySelector(".card-template"),ee=document.querySelector(".popup__input_user-title"),te=document.querySelector(".popup__input_avatar-img"),ne=document.querySelector(".popup__input_user-subtitle"),re=document.querySelector(".btn-user-edit"),oe=document.querySelector(".btn-avatar-edit"),ie=document.querySelector(".profile__btn_user-add"),ue=document.querySelector(".edit-profile__popup"),ce=document.querySelector(".new-avatar__popup"),ae=document.querySelector(".add-plaсe__popup"),se=ue.querySelector(".popup__btn"),le=ce.querySelector(".popup__btn"),fe=ae.querySelector(".popup__btn"),pe=document.querySelector(".confirmation-btn"),he=(document.querySelector(".confirmation .popup__btn"),new F({url:"https://mesto.nomoreparties.co/v1/cohort-34",headers:{authorization:"1690dfea-cbda-42f6-a87e-a16c1f76892e","Content-Type":"application/json"}})),_e=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return H(n,[Z,Pe,Le,Se,Ee].concat(t,[he]))},ye=new a({data:[],renderer:function(e){e._id;var t=_e(e,N).render();return this.addItem(t),t}},Y),de=new V("profile__name","profile__job");Promise.all([he.getInitialCards(),he.getUser()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],u=!0,c=!1;try{for(n=n.call(e);!(u=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);u=!0);}catch(e){c=!0,o=e}finally{try{u||null==n.return||n.return()}finally{if(c)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return M(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?M(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];N=i._id,ye.renderItems(o),de.setUserInfo({name:i.name,about:i.about}),J=i.avatar,de.setUserAvatar(J)})).catch((function(e){return console.log("WASTED - ".concat(e))}));var ve=document.querySelector(".edit-profile__popup .popup__form"),me=document.querySelector(".add-plaсe__popup .popup__form"),be=new u(e,ve),ge=new u(e,me);be.enableValidation(),ge.enableValidation();var we=new B(G,Se,Ee);function Se(e){we.openPopup()}function Ee(e){we.closePopup()}we.setEventListeners();var ke=new m(K,X,Q);function Pe(e,t){ke.openPopup(e,t)}ke.setEventListeners();var Oe=new C(ae,(function(e,t){fe.textContent="Сохраняется...",he.postCreateCard(t).then((function(e){ye.addItem(_e(e,N).render(),"prepend"),Oe.closePopup()})).catch((function(e){return console.log("WASTED - ".concat(e))})).finally((function(){return fe.textContent="Сохранить"}))}));Oe.setEventListeners();var Ce=new C(ue,(function(e,t){var n=t.title,r=t.subtitle;de.setUserInfo({name:n,about:r}),se.textContent="Сохраняется...",he.postUser({name:n,about:r}).then((function(e){de.setUserInfo({name:n,about:r}),Ce.closePopup()})).catch((function(e){return console.log("WASTED - ".concat(e))})).finally((function(){return se.textContent="Сохранить"}))}));Ce.setEventListeners();var je=new C(ce,(function(e,t){e.preventDefault(),le.textContent="Сохраняется...",he.postAvatar(t).then((function(e){de.setUserAvatar(t["avatar-src"]),je.closePopup()})).catch((function(e){return console.log("WASTED - ".concat(e))})).finally((function(){return le.textContent="Сохранить"}))}));function Le(){var e=this;we.openPopup(),pe.onclick=function(t){t.preventDefault(),pe.textContent="Удаляется...",he.deleteCard(e._id).then((function(t){e._view.remove(),we.closePopup()})).catch((function(e){return console.log("Ошибка ".concat(e))})).finally((function(){return pe.textContent="Да"}))}}je.setEventListeners(),re.addEventListener("click",(function(){be.resetValidation();var e=de.getUserInfo();ee.value=e.name,ne.value=e.about,Ce.openPopup(),be.toggleButtonState()})),oe.addEventListener("click",(function(){be.resetValidation();var e=de.getUserAvatar();te.value=e.avatar,je.openPopup(),be.toggleButtonState()})),ie.addEventListener("click",(function(){ge.resetValidation(),Oe.openPopup()}))})();