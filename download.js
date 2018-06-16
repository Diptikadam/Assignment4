var http = require('http');
var fs = require('fs');

function startServer(landingPage) 
{
	var lp = landingPage;
	console.log("-> 1")
  
    http.createServer(function(request, response) 
	{
	    if(request.url != '/')
	    {
	    	fs.readFile('.'+ request.url, function (err, nhtml) 
	    	{
	    		if(request.url!="/favicon.ico")
	    		{
					console.log("-> 2", request.url);
	    			response.writeHeader(200, {"Content-Type": "text/html"}); 
	    			response.write(nhtml);
			        response.end(); 
			    } 		
	    	});
	    }
	    else
	    {
	    	response.writeHeader(200, {"Content-Type": "text/html"});  
	    	console.log("->3");
		    response.write(lp);
		    response.end();  
	    }
	}).listen(8080);
}

function start()
{
	beforeStart(function(files) 
	{
		var arr = files;
		var indexHTMLStr = "<!DOCTYPE html> \
		<html> \
			<head> \
				<title>Hello</title> \
			</head> \
			<body>";

		var links = "";
		for(var i = 0; i < arr.length; i++)
		{
			links += "<a href=\"/"+ arr[i] +"\" download>" + arr[i] + "</a><br/> ";
		}

		indexHTMLStr += links;
		indexHTMLStr += "</body> \
		</html>";
		startServer(indexHTMLStr);
	});

}

function beforeStart(callback) 
{
	// read the directory
	var testf ='/Users/diptikadam/dipti';
    fs.readdir(testf, function(err, files) {
    	callback(files);
    });
}

start();