var koa     = require('koa');
var router  = require('koa-router')();
var request = require('koa-request');
var qs      = require("query-string");

var app = koa();

var CUSTOMERS_API = 'http://www.taiwanbus.tw/app_api/CustomerRoute.ashx?';
var ROUTES_API    = 'http://www.taiwanbus.tw/app_api/SP_PredictionTime.ashx?';
var BUS_API       = 'http://www.taiwanbus.tw/app_api/CarPosision.ashx?';

router
  // 列出全部客運業者
  .get('/customers', function *(next) {

    var options = {
      url: CUSTOMERS_API
    };

    var response = yield request(options);
    var info = JSON.parse(response.body).cusResult;
    this.body = info;
  })

  // 列出單一客運業者明細

  .get('/customers/:customer_id', function *(next) {
    var params = {
      cusID : this.params.customer_id
    };

    var options = {
      url: CUSTOMERS_API + qs.stringify(params)
    };

    var response = yield request(options);
    var info = JSON.parse(response.body).routeResult;
    this.body = info;
  })

  // 列出單一路線明細
  .get('/customers/:customer_id/routes/:route_id/back', function *(next) {

    var params = {
      routeNo: this.params.route_id,
      branch: 0,
      goBack: 2,
      Lang: '',
      Source: 'w'
    };

    var options = {
      url: ROUTES_API + qs.stringify(params)
    };

    var response = yield request(options);
    var info = JSON.parse(response.body);
    this.body = info;
  })

  // 列出單一路線明細
  .get('/customers/:customer_id/routes/:route_id', function *(next) {

    var params = {
      routeNo: this.params.route_id,
      branch: 0,
      goBack: 1,
      Lang: '',
      Source: 'w'
    };

    var options = {
      url: ROUTES_API + qs.stringify(params)
    };

    var response = yield request(options);
    var info = JSON.parse(response.body);
    this.body = info;
  })

  // 列出公車明細
  .get('/customers/:customer_id/routes/:route_id/bus', function *(next) {

    var params = {
      routeNo: this.params.route_id ,
      routeBranch: 0,
      goback: 1,
    };

    var options = {
      url: BUS_API + qs.stringify(params)
    };

    var response = yield request(options);
    var info = JSON.parse(response.body);
    this.body = info;
  })

  .get('/customers/:customer_id/routes/:route_id/back/bus', function *(next) {

    var params = {
      routeNo: this.params.route_id ,
      routeBranch: 0,
      goback: 2,
    };

    var options = {
      url: BUS_API + qs.stringify(params)
    };

    var response = yield request(options);
    var info = JSON.parse(response.body);
    this.body = info;
  })

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3030);
