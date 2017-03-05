webpackJsonp([1,4],{

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__configuration_configuration_service__ = __webpack_require__(376);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RestService = (function () {
    function RestService(_http, _config) {
        var _this = this;
        this._http = _http;
        this._config = _config;
        this.setTokenProvider = function (serv) {
            _this.tokenProvider = serv;
        };
        this.logIn = function (us, pw) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
            var body = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* URLSearchParams */]();
            body.set('username', us);
            body.set('password', pw);
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            return _this._http.post("/api/auth", body, { headers: headers })
                .map(function (res) {
                return res.json();
            })
                .catch(function (error) {
                if (error.status == 400) {
                    return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].of(error);
                }
                else {
                    return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].throw(error.json().error || 'Server error');
                }
            });
        };
        /* test functions for demoing that auth works*/
        this.getPublic = function () {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
            // if(this.tokenProvider==null){
            // 	return Observable.throw('Token not available');
            // }
            // headers.append('Authorization', 'Bearer ' + this.tokenProvider.token);
            return _this._http.get(_this._config.ApiUrl + "/test/public", { headers: headers })
                .map(function (res) { console.log(res); return res.json(); });
        };
        this.getUser = function () {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
            headers.append('Authorization', 'Bearer ' + _this.tokenProvider.token);
            return _this._http.get(_this._config.ApiUrl + "/test/user", { headers: headers })
                .map(function (res) { console.log(res); return res.json(); });
        };
        this.getAdmin = function () {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
            headers.append('Authorization', 'Bearer ' + _this.tokenProvider.token);
            return _this._http.get(_this._config.ApiUrl + "/test/admin", { headers: headers })
                .map(function (res) { console.log(res); return res.json(); });
        };
        /* ------------------------------------------- */
        this.getUserById = function (id) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
            headers.append('Authorization', 'Bearer ' + _this.tokenProvider.token);
            return _this._http.get(_this._config.ApiUrl + "/users/" + id, { headers: headers })
                .map(function (res) { return res.json(); });
        };
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
    RestService.prototype.handleError = function (error) {
        console.log("here");
        console.log(error.json().error || 'Server error');
        return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].of(error.json().error || 'Server error');
    };
    RestService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__configuration_configuration_service__["a" /* ConfigurationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__configuration_configuration_service__["a" /* ConfigurationService */]) === 'function' && _b) || Object])
    ], RestService);
    return RestService;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/Shaat/Desktop/bme/onlab/public-space-planner/Client/src/rest.service.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__network_rest_service__ = __webpack_require__(226);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthenticationService = (function () {
    function AuthenticationService(_restService) {
        this._restService = _restService;
        this.token = "";
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(currentUser);
        _restService.setTokenProvider(this);
        if (currentUser) {
            this.token = currentUser.token;
            this._userId = currentUser.id;
        }
    }
    // login(username: string, password: string): Observable<boolean> {
    //     return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
    //         .map((response: Response) => {
    //             // login successful if there's a jwt token in the response
    //             let token = response.json() && response.json().token;
    //             if (token) {
    //                 // set token property
    //                 this.token = token;
    //                 // store username and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
    //                 // return true to indicate successful login
    //                 return true;
    //             } else {
    //                 // return false to indicate failed login
    //                 return false;
    //             }
    //         });
    // }
    AuthenticationService.prototype.logIn = function (username, password) {
        // return this._restService.logIn(username,password)
        //                 .flatMap(res => {
        //                     if(res.ok!=false){
        //                         console.log("ayy1");
        var _this = this;
        //                         console.log(res);
        //                         return res["id"];
        //                     }
        //                     console.log("ayy2");
        //                     return "false";
        //                 })
        //                 .flatMap((res:number)=>{
        //                     console.log("ayy2");
        //                     return this._restService.getUserById(res).map(res=> {
        //                         console.log("ayy4");
        //                         console.log(res);
        //                         return false;
        //                     });
        //                 },
        //                 (err:string)=>{
        //                     console.log("ayy5");
        //                     console.log(err); 
        //                     return false;
        //                 })
        // return this._restService.logIn(username, password)
        //                 .map((res:Response) => {
        //                     console.log(res);
        //                     if(res.ok !== false){
        //                         console.log("ayy1");
        //                         this.token = res["access_token"];
        //                         return res["id"];
        //                     }
        //                     console.log("ayy2");
        //                 }).mergeMap(
        //                     (data:number) => {
        //                         console.log("ayy3");
        //                         return this._restService.getUserById(data).map(
        //                             data=>{
        //                                 this._currentUser = data;
        //                                 return false;
        //                         });
        //                     },
        //                 );
        return this._restService.logIn(username, password)
            .map(function (res) {
            if (res.ok == false) {
                return false;
            }
            _this.token = res["access_token"];
            _this._userId = res["id"];
            localStorage.setItem('currentUser', JSON.stringify({ id: _this._userId, token: _this.token }));
            return true;
        });
    };
    AuthenticationService.prototype.isLoggedIn = function () {
        return this.token ? true : false;
    };
    // getLoggedIn() : Observable<User>  {
    //     if(this._currentUser && this._currentUser.id != this._userId){
    //         return this._restService.getUserById(this._userId).map(data => {
    //             // var u = new User({id : data["id"], name: data["name"],username: data["username"],role : data["role"]});
    //             var u = new User();
    //             u.id = data["id"];
    //             u.name = data["name"];
    //             u.username = data["username"];
    //             u.role = data["role"];
    //             this._currentUser = u;
    //             return u;
    //         })
    //     }
    //     else if(this._currentUser){
    //         return Observable.of(null);
    //     }
    //     else{
    //         return Observable.of(this._currentUser);
    //     }
    // }
    AuthenticationService.prototype.logOut = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    };
    AuthenticationService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__network_rest_service__["a" /* RestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__network_rest_service__["a" /* RestService */]) === 'function' && _a) || Object])
    ], AuthenticationService);
    return AuthenticationService;
    var _a;
}());
//# sourceMappingURL=C:/Users/Shaat/Desktop/bme/onlab/public-space-planner/Client/src/authentication.service.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigurationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ConfigurationService = (function () {
    function ConfigurationService() {
        this.ApiUrl = "/api";
    }
    ConfigurationService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], ConfigurationService);
    return ConfigurationService;
}());
//# sourceMappingURL=C:/Users/Shaat/Desktop/bme/onlab/public-space-planner/Client/src/configuration.service.js.map

/***/ }),

/***/ 426:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 426;


/***/ }),

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(540);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=C:/Users/Shaat/Desktop/bme/onlab/public-space-planner/Client/src/main.js.map

/***/ }),

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* unused harmony export User */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var User = (function () {
    function User() {
    }
    return User;
}());
var USERS = [
    { id: 11, name: 'Mr. Nice', username: 'Mr. Nice' },
    { id: 12, name: 'Narco', username: 'Narco' },
    { id: 13, name: 'Bombasto', username: 'Bombasto' },
    { id: 14, name: 'Celeritas', username: 'Celeritas' },
    { id: 15, name: 'Magneta', username: 'Magneta' },
    { id: 16, name: 'RubberMan', username: 'RubberMan' },
    { id: 17, name: 'Dynama', username: 'Dynama' },
    { id: 18, name: 'Dr IQ', username: 'Dr IQ' },
    { id: 19, name: 'Magma', username: 'Magma' },
    { id: 20, name: 'Tornado', username: 'Tornado' }
];

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
        this.users = USERS;
    }
    AppComponent.prototype.onSelect = function (user) {
        this.selectedUser = user;
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(599),
            styles: [__webpack_require__(595)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=C:/Users/Shaat/Desktop/bme/onlab/public-space-planner/Client/src/app.component.js.map

/***/ }),

/***/ 538:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__ = __webpack_require__(534);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__configuration_configuration_service__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__auth_authentication_service__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__users_login_tester_login_tester_component__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__network_rest_service__ = __webpack_require__(226);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_8__users_login_tester_login_tester_component__["a" /* LoginTesterComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot()
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_5__configuration_configuration_service__["a" /* ConfigurationService */], __WEBPACK_IMPORTED_MODULE_6__auth_authentication_service__["a" /* AuthenticationService */], __WEBPACK_IMPORTED_MODULE_9__network_rest_service__["a" /* RestService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=C:/Users/Shaat/Desktop/bme/onlab/public-space-planner/Client/src/app.module.js.map

/***/ }),

/***/ 539:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_authentication_service__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__network_rest_service__ = __webpack_require__(226);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginTesterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginTesterComponent = (function () {
    function LoginTesterComponent(authService, restService) {
        this.authService = authService;
        this.restService = restService;
        this.user = null;
        this._authService = authService;
        this._restService = restService;
        if (this._authService.isLoggedIn())
            this.getUserData();
    }
    LoginTesterComponent.prototype.ngOnInit = function () {
    };
    LoginTesterComponent.prototype.onSubmit = function () {
        var _this = this;
        // console.log(this.un, this.pw);
        this._authService.logIn(this.un, this.pw).subscribe(function (success) {
            console.log(success);
            if (success) {
                _this.getUserData();
            }
            else
                console.log("login failed");
        }, function (err) { return console.log(err); });
    };
    LoginTesterComponent.prototype.getUserData = function () {
        var _this = this;
        this._restService.getUserById(this._authService._userId).subscribe(function (user) { return _this.user = user; });
    };
    LoginTesterComponent.prototype.logOut = function () {
        this._authService.logOut();
        this.user = null;
    };
    LoginTesterComponent.prototype.getPublic = function () {
        var _this = this;
        // this.users = [];
        this._restService.getPublic().subscribe(function (data) {
            _this.publicdata = data.data;
            // this.users = data;
        }, function (err) { return _this.publicdata = err; });
    };
    LoginTesterComponent.prototype.getUser = function () {
        var _this = this;
        // this.users = [];
        this._restService.getUser().subscribe(function (data) {
            _this.userdata = data.data;
            // this.users = data;
        }, function (err) { return _this.userdata = err; });
    };
    LoginTesterComponent.prototype.getAdmin = function () {
        var _this = this;
        // this.users = [];
        this._restService.getAdmin().subscribe(function (data) {
            _this.admindata = data.data;
            // this.users = data;
        }, function (err) { return _this.admindata = err; });
    };
    LoginTesterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
            selector: 'app-login-tester',
            template: __webpack_require__(600),
            styles: [__webpack_require__(596)],
            providers: [__WEBPACK_IMPORTED_MODULE_1__auth_authentication_service__["a" /* AuthenticationService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__auth_authentication_service__["a" /* AuthenticationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__auth_authentication_service__["a" /* AuthenticationService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__network_rest_service__["a" /* RestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__network_rest_service__["a" /* RestService */]) === 'function' && _b) || Object])
    ], LoginTesterComponent);
    return LoginTesterComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/Shaat/Desktop/bme/onlab/public-space-planner/Client/src/login-tester.component.js.map

/***/ }),

/***/ 540:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=C:/Users/Shaat/Desktop/bme/onlab/public-space-planner/Client/src/environment.js.map

/***/ }),

/***/ 595:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(99)();
// imports


// module
exports.push([module.i, ".selected {\n  background-color: #CFD8DC !important;\n  color: white;\n}\n.users {\n  margin: 0 0 2em 0;\n  list-style-type: none;\n  padding: 0;\n  width: 15em;\n}\n.users li {\n  cursor: pointer;\n  position: relative;\n  left: 0;\n  background-color: #EEE;\n  margin: .5em;\n  padding: .3em 0;\n  height: 1.6em;\n  border-radius: 4px;\n}\n.users li.selected:hover {\n  background-color: #BBD8DC !important;\n  color: white;\n}\n.users li:hover {\n  color: #607D8B;\n  background-color: #DDD;\n  left: .1em;\n}\n.users .text {\n  position: relative;\n  top: -3px;\n}\n.users .badge {\n  display: inline-block;\n  font-size: small;\n  color: white;\n  padding: 0.8em 0.7em 0 0.7em;\n  background-color: #607D8B;\n  line-height: 1em;\n  position: relative;\n  left: -1px;\n  top: -4px;\n  height: 1.8em;\n  margin-right: .8em;\n  border-radius: 4px 0 0 4px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 596:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(99)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 599:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n\t\t<app-login-tester></app-login-tester>\n<!-- \t\t<div class=\"col-md-6 col-sm-6\">\n\t\t\t<h2 class=\"text-center\">Users</h2>\n\t\t\t<ul class=\"users\">\n\t\t\t\t<li *ngFor=\"let user of users\" (click)=\"onSelect(user)\" [class.selected]=\"user===selectedUser\">\n\t\t\t\t\t<span>{{user.name}}</span>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</div>\n\n\t\t<div *ngIf=\"selectedUser\" class=\"col-md-6 col-sm-6\" >\n\t\t\t<h2>{{selectedUser.name}}</h2>\n\t\t\t<div><label>id: </label>{{selectedUser.id}}</div>\n\t\t\t<div>\n\t\t\t    <label>name: </label>\n\t\t\t    <input [(ngModel)]=\"selectedUser.name\" placeholder=\"name\"/>\n\t\t\t</div>\n\t\t</div>\n -->\n\n</div>\n"

/***/ }),

/***/ 600:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\t<div class=\"row\">\n\t\t<form class=\"col-md-6 col-md-offset-3\" (ngSubmit)=\"onSubmit()\">\n\t\t\t<h1 class=\"text-center\">Login</h1>\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"username\">Username</label>\n\t\t\t\t<input type=\"text\" [(ngModel)]=\"un\" class=\"form-control\" name=\"username\" required>\n\t\t\t</div>\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"password\">Password</label>\n\t\t\t\t<input type=\"password\" [(ngModel)]=\"pw\" class=\"form-control\" name=\"password\" required>\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<input class=\"btn btn-primary col-md-2 col-md-offset-3 col-sm-2 col-sm-offset-3\" type=\"submit\" value=\"Login\">\n\t\t\t\t<input class=\"btn btn-primary col-md-2 col-md-offset-2 col-sm-2 col-sm-offset-2\" type=\"button\" value=\"Logout\" (click)=\"logOut()\">\n\t\t\t</div>\n\t\t\t<div *ngIf=\"user \" style=\"margin-top:30px; padding:10px; font-size:big; border: 1px solid #333;\">\n\t\t\t\t<span>Hello {{user.name}}! You are logged in as a(n) {{user.role}}.</span>\n\t\t\t</div>\n\t\t</form>\n\t</div>\n\t<div class=\"row\" style=\"margin-top:30px;\">\n\t\t<input class=\"btn btn-primary \" value=\"GET Public route\" (click)=\"getPublic()\">\n\t\t<span>{{publicdata}}</span>\n\t</div>\n\n\t<div class=\"row\" style=\"margin-top:30px;\">\n\t\t<input class=\"btn btn-primary \" value=\"GET User route\" (click)=\"getUser()\">\n\t\t<span>{{userdata}}</span>\n\t</div>\n\t<div class=\"row\" style=\"margin-top:30px;\">\n\t\t<input class=\"btn btn-primary \" value=\"GET Admin route\" (click)=\"getAdmin()\">\n\t\t<span>{{admindata}}</span>\n\t</div>\n<!-- \t<div class=\"row\" style=\"margin-top:100px;\">\n\n\t\t<table class=\"table table-hover\">\n\t\t\t<thead>\n\t\t\t\t<td>ID</td>\n\t\t\t\t<td>Name</td>\n\t\t\t\t<td>Username</td>\n\t\t\t</thead>\n\t\t\t<tr *ngFor=\"let user of users\">\n\t\t\t\t<td>{{user.id}}</td>1\n\t\t\t\t<td>{{user.name}}</td>\n\t\t\t\t<td>{{user.username}}</td>\n\t\t\t</tr>\n\n\t\t</table>\n\t</div> -->\n</div>"

/***/ }),

/***/ 873:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(427);


/***/ })

},[873]);
//# sourceMappingURL=main.bundle.js.map