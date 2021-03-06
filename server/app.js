var express = require('express')
    ,cons = require('consolidate')
    ,controller = require('./controller')
    ,bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/../static',{
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','less'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path) {
    res.set('x-timestamp', Date.now())
  }
}))
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies

app.engine('html', cons.swig);
// set .html as the default extension 
app.set('view engine', 'html');
app.set('views', __dirname + '/../views');

app.get('/',function(req,res){
	res.send('test');
})

app.get('/agg/*',function(req,res){
    controller.loadAgg(req,res)
})

app.post('/edit/agg',function(req,res){
    controller.editAgg(req,res)
})

app.get('/doc/*',function(req,res){
    controller.loadDoc(req,res)
})

app.post('/edit/doc',function(req,res){
    controller.editDoc(req,res)
})

app.get('/update/agg',function(req,res){
    controller.updateAgg(req,res);
})

app.get('/update/doc/*',function(req,res){
    controller.updateDoc(req,res);
})

try{

  app.listen(3000)

  console.log('server started!')

}catch(e){

  console.log(e)

}