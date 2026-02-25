// => Compilation des HTML
let template = ejs.compile(str, options);
template(data);

// => Compilation des HTML
ejs.render(str, data, options);

ejs.renderFile(filename, data, options, function(err, str){
    // str => Rendered HTML string
});