var usetouch=false;
var route=new Array();

var mlat=41.7152682434194;
var mlng=44.78254072883642;

var mzoom=15; 
var xtile=0;
var ytile=0;

var mstart_x=0;
var mstart_y=0;
var mend_x=0;
var mend_y=0;
var mclicked=false;

var mapw=500;
var maph=500;

var ymin=0;
var xmin=0;

var load_local=1;


var mousex=0;
var mousey=0;

var addx=0;
var addy=0;

var oncemore=0;
var myframe ;

var showing= new Array();
for (i=0;i<=4 ;i++ )
	{
	showing[i]=new Array();
	for (ii=0;ii<=4 ;ii++ )
		{
		showing[i][ii]=0;
		}
	}


var passive_mousex=0;
var passive_mousey=0;

var oldsdvigx=0;
var oldsdvigy=0;
var all_loaded=0;

var pix_lat=0;
var pix_lng=0;
var mlefty=0;
var mleftx=0;

var sdvigx=0;
var sdvigy=0;


var c;
var ctx;

function map_init(w, h, mt)
	{
	mapw=w;
	maph=h;
	usetouch=mt;
	myframe= document.getElementById("mainframe");
	c=document.getElementById("myCanvas");
	ctx=c.getContext("2d");

	xmin=parseInt((5*256-mapw)/2);
	ymin=parseInt((5*256-maph)/2);

	
	myframe.addEventListener("touchstart", onmdown, false);
	myframe.addEventListener("touchend", onmup, false);
	myframe.addEventListener("touchmove", onmmove, false);

	myframe.addEventListener("wheel", scrollscr);
	for (i=0;i<=4 ;i++ )
		{
		for (ii=0;ii<=4 ;ii++ )
			{
			document.getElementById("image_loader").innerHTML+="<img id='img_"+ii+"_"+i+"'>";
			}
		}
	set_map_center();
	}

function scrollscr(event)
	{
	console.log(event.deltaY);

	if (event.deltaY>0 && mzoom>0)
		{
		mzoom=mzoom-1;
		set_map_center();
		console.log("mzoom: "+mzoom);
		}
	else if (event.deltaY<0 && ( ( load_local==1 && mzoom<15) || (load_local==2 && mzoom<18) ) )
		{
		mzoom=mzoom+1;
		if (load_local==1 && mzoom>15)
			{
			mzoom=15;
			}
//		parse_mouse(event);

	//	mousex=passive_mousex;
	//	mousey=passive_mousey;

		console.log("mzoom: "+mzoom);
	//	move_map_by_mouse();
		set_map_center();
		}
	//console.log("zoom: "+mzoom);

	}
function temp_center()
	{

	mlat=MyLat;
	mlng=MyLong;
	set_map_center();
	}


function zoomin()
	{
	if (  ( load_local==1 && mzoom<15) || (load_local==2 && mzoom<18)  )
		{
		mzoom++;
		}
	set_map_center();
	}


function zoomout()
	{
	if (  mzoom>0  )
		{
		mzoom--;
		}
	set_map_center();
	}

function parse_mouse(event)
	{

	var x;
	var y;

	if (usetouch)
		{
		

		if (event.changedTouches[0].pageX || event.changedTouches[0].pageY) 
			{ 
		  x = event.changedTouches[0].pageX;
		  y = event.changedTouches[0].pageY;
		}
		else { 
		  x = event.changedTouches[0].clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
		  y = event.changedTouches[0].clientY + document.body.scrollTop + document.documentElement.scrollTop; 
		} 
		x -= myframe.offsetLeft;
		y -= myframe.offsetTop;


		}

	else
		{
		if (event.pageX || event.pageY) { 
		  x = event.pageX;
		  y = event.pageY;
		}
		else { 
		  x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
		  y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
		} 
		x -= myframe.offsetLeft;
		y -= myframe.offsetTop;
		}
	mousex=x;
	mousey=y;
	}

function onmyclick(event)
	{
//	parse_mouse(event);
//	console.log(mousex+ " - "+mousey);
//	ctx.beginPath();
//	ctx.arc(mousex+sdvigx,mousey-sdvigy,5,0,2*Math.PI);
//	ctx.stroke();
	}

function onmdown(event)
	{
	mclicked=true;
	parse_mouse(event);
	mstart_x=mousex;
	mstart_y=mousey;

	}

function onmmove(event)
	{
	parse_mouse(event);
	passive_mousex=mousex;
	passive_mousey=mousey;

	if (mclicked==true)
		{
		if (live_loc==0 || MyLat==0)
			{
			addx=mousex-mstart_x;
			addy=mousey-mstart_y;

			c.style.left=(-sdvigx-xmin+addx)+"px";
			c.style.top=(sdvigy-ymin+addy)+"px";
			}
		}
	}

function onmup(event)
	{
	parse_mouse(event);
	if (mclicked==true)
		{
		addx=0;addy=0;
		mend_x=mousex;
		mend_y=mousey;
		msx=mend_x-mstart_x;
		msy=mend_y-mstart_y;
		mousex=128-msx;
		mousey=128-msy;
		move_map_by_mouse();
		}
	mclicked=false;
	}

function move_map_by_mouse()
	{

	if (live_loc==0 || MyLat==0)
		{
	
		var myx=mousex+sdvigx+xmin;
		var myy=mousey-sdvigy+ymin;

		var sx=(myx-(xmin+mleftx));
		var sy=(myy-(ymin+mlefty));

		var lngdif=sx*pix_lng;
		var latdif=sy*pix_lat;

		lat1=mlat-latdif;//(pix_lat*(mousex-384+sdvigx));
		lng1=mlng+lngdif;//((384-mousey+sdvigy)*pix_lng);	
		mlat=lat1;
		mlng=lng1;
		var lat_sxvaoba=lat1-mlat;
		var lng_sxvaoba=mlng-lng1;
		}
	else
		{
		mlat=MyLat;
		mlng=MyLong;
		}

	set_map_center();

	}

function set_map_center()
	{
	xtile=long2tile(mlng, mzoom);
	ytile=lat2tile(mlat, mzoom);

	all_loaded=0;




	
	var load_status=load_pngs();


	for (i=0;i<=4 ;i++ )
		{
		for (ii=0;ii<=4 ;ii++ )
			{
			showing[i][ii]=0;
			}
		}

	lng1=tile2long(xtile, mzoom);
	lat1=tile2lat(ytile, mzoom);
	lat_sxvaoba=lat1-mlat;
	lng_sxvaoba=mlng-lng1;
	pixel_width();
	mlefty=lat_sxvaoba/pix_lat;
	mleftx=lng_sxvaoba/pix_lng;
	sdvigx=mleftx-128;
	sdvigy=128-mlefty;
	oncemore=0;
	ctx.clearRect(0, 0, c.width, c.height);
//	setTimeout("draw_tiles()",100);
	draw_tiles();
	}

function load_pngs()
	{

	var addr="maps";
	if (load_local==2)
		{
		addr="https://c.tile.openstreetmap.org";
		}
	//	console.log("load: "+addr+"/"+mzoom+"/"+(xtile)+"/"+(ytile)+".png");
	document.getElementById("img_"+2+"_"+2).src=addr+"/"+mzoom+"/"+(xtile)+"/"+(ytile)+".png";
	document.getElementById("img_"+2+"_"+1).src=addr+"/"+mzoom+"/"+(xtile)+"/"+(ytile-1)+".png";
	document.getElementById("img_"+2+"_"+3).src=addr+"/"+mzoom+"/"+(xtile)+"/"+(ytile+1)+".png";

	document.getElementById("img_"+1+"_"+2).src=addr+"/"+mzoom+"/"+(xtile-1)+"/"+(ytile)+".png";
	document.getElementById("img_"+1+"_"+1).src=addr+"/"+mzoom+"/"+(xtile-1)+"/"+(ytile-1)+".png";
	document.getElementById("img_"+1+"_"+3).src=addr+"/"+mzoom+"/"+(xtile-1)+"/"+(ytile+1)+".png";

	document.getElementById("img_"+3+"_"+2).src=addr+"/"+mzoom+"/"+(xtile+1)+"/"+(ytile)+".png";
	document.getElementById("img_"+3+"_"+1).src=addr+"/"+mzoom+"/"+(xtile+1)+"/"+(ytile-1)+".png";
	document.getElementById("img_"+3+"_"+3).src=addr+"/"+mzoom+"/"+(xtile+1)+"/"+(ytile+1)+".png";

	document.getElementById("img_"+2+"_"+0).src=addr+"/"+mzoom+"/"+(xtile)+"/"+(ytile-2)+".png";
	document.getElementById("img_"+2+"_"+4).src=addr+"/"+mzoom+"/"+(xtile)+"/"+(ytile+2)+".png";
	document.getElementById("img_"+1+"_"+0).src=addr+"/"+mzoom+"/"+(xtile-1)+"/"+(ytile-2)+".png";
	document.getElementById("img_"+1+"_"+4).src=addr+"/"+mzoom+"/"+(xtile-1)+"/"+(ytile+2)+".png";
	document.getElementById("img_"+3+"_"+0).src=addr+"/"+mzoom+"/"+(xtile+1)+"/"+(ytile-2)+".png";
	document.getElementById("img_"+3+"_"+4).src=addr+"/"+mzoom+"/"+(xtile+1)+"/"+(ytile+2)+".png";

	document.getElementById("img_"+0+"_"+2).src=addr+"/"+mzoom+"/"+(xtile-2)+"/"+(ytile)+".png";
	document.getElementById("img_"+0+"_"+1).src=addr+"/"+mzoom+"/"+(xtile-2)+"/"+(ytile-1)+".png";
	document.getElementById("img_"+0+"_"+3).src=addr+"/"+mzoom+"/"+(xtile-2)+"/"+(ytile+1)+".png";
	document.getElementById("img_"+0+"_"+0).src=addr+"/"+mzoom+"/"+(xtile-2)+"/"+(ytile-2)+".png";
	document.getElementById("img_"+0+"_"+4).src=addr+"/"+mzoom+"/"+(xtile-2)+"/"+(ytile+2)+".png";

	document.getElementById("img_"+4+"_"+2).src=addr+"/"+mzoom+"/"+(xtile+2)+"/"+(ytile)+".png";
	document.getElementById("img_"+4+"_"+1).src=addr+"/"+mzoom+"/"+(xtile+2)+"/"+(ytile-1)+".png";
	document.getElementById("img_"+4+"_"+3).src=addr+"/"+mzoom+"/"+(xtile+2)+"/"+(ytile+1)+".png";
	document.getElementById("img_"+4+"_"+0).src=addr+"/"+mzoom+"/"+(xtile+2)+"/"+(ytile-2)+".png";
	document.getElementById("img_"+4+"_"+4).src=addr+"/"+mzoom+"/"+(xtile+2)+"/"+(ytile+2)+".png";
	return "loaded";
	}

function draw_tiles()
	{
	for (i=0;i<=4 ;i++ )
		{
		for (ii=0;ii<=4 ;ii++ )
			{	
			if (showing[i][ii]==0)
				{		
				if (document.getElementById("img_"+ii+"_"+i).complete)
					{
					showing[i][ii]++;		
					ctx.drawImage(document.getElementById("img_"+ii+"_"+i),ii*256,i*256);
					all_loaded++;
					}
				else
					{
					//console.log("not loaded "+ii+" - "+i);
					}
				}
			
			}
		}

	if (oldsdvigx!=sdvigx || oldsdvigy!=sdvigy)
		{
		c.style.left=(-sdvigx-xmin)+"px";
		c.style.top=(sdvigy-ymin)+"px";
		oldsdvigx=sdvigx;
		oldsdvigy=sdvigy;
		}


	if (all_loaded<25)
		{
		setTimeout("draw_tiles()",50);
		oncemore++;
	//	console.log("once more: "+oncemore);
		}
	
	if (all_loaded>9)
		{
		draw_route();
		if (MyLat!=0)
			{
			draw_my_pos();
			}
		}
	}    

function draw_my_pos()
	{
	yt=lat2tile(MyLat, mzoom);
	xt=long2tile(MyLong, mzoom);
	
	if (Math.abs(xt-xtile)<2 && Math.abs(yt-ytile)<2)
		{
		koordx=0;koordy=0;
		lat1=tile2lat(ytile-2, mzoom);
		lng1=tile2long(xtile-2, mzoom);
		koordy=(MyLat-lat1)/pix_lat;
		koordx=(MyLong-lng1)/pix_lng;
	
		ctx.beginPath();
		ctx.arc(koordx,-koordy,6,0,2*Math.PI);
		ctx.strokeStyle = 'blue';
		ctx.lineWidth = 5;
		ctx.stroke();
		ctx.closePath();	
		}
	}
var mpoints=new Array();
function draw_route()
	{
	if (route.length>0)
		{
		lat1=tile2lat(ytile-2, mzoom);
		lng1=tile2long(xtile-2, mzoom);
		var thex=0;
		var they=0;
		var end_x=0;
		var end_y=0;
		ctx.beginPath();
		ctx.strokeStyle = 'purple';
		ctx.lineWidth = 3;
		xt=0;yt=0;xt2=0;yt2=0;
		for (i=0;i<route.length ;i++ )
			{
			stlat=route[i]['stlat'];
			stlng=route[i]['stlng'];
			enlat=route[i]['enlat'];
			enlng=route[i]['enlng'];
			
			mpoints=route[i]['points'];
			yt=lat2tile(stlat, mzoom);
			xt=long2tile(stlng, mzoom);

			yt2=lat2tile(enlat, mzoom);
			xt2=long2tile(enlng, mzoom);

			if ((Math.abs(xt-xtile)<2 && Math.abs(yt-ytile)<2) || (Math.abs(xt2-xtile)<2 && Math.abs(yt2-ytile)<2) )
				{
				
				koordx=0;koordy=0;
				
				koordy1=(stlat-lat1)/pix_lat;
				koordx1=(stlng-lng1)/pix_lng;

				koordy2=(enlat-lat1)/pix_lat;
				koordx2=(enlng-lng1)/pix_lng;
				if (thex==0)
					{
					thex=koordx1;
					they=koordy1;
					ctx.moveTo(koordx1,-koordy1);
					}
				else
					{
				//	ctx.lineTo(koordx1,-koordy1);
					}
								
				for (ii=0;ii<mpoints.length ;ii++ )
					{
					ky1=(mpoints[ii][0]-lat1)/pix_lat;
					kx1=(mpoints[ii][1]-lng1)/pix_lng;
					ctx.lineTo(kx1,-ky1);

					}
				}
			}
		ctx.stroke(); 
		ctx.closePath();	

		if ((Math.abs(xt-xtile)<2 && Math.abs(yt-ytile)<2) )
			{
			ctx.beginPath();
			ctx.arc(thex,-they,5,0,2*Math.PI);
			ctx.strokeStyle = 'green';
			ctx.lineWidth = 4;
			ctx.stroke();
			ctx.closePath();
			}

		if ((Math.abs(xt2-xtile)<2 && Math.abs(yt2-ytile)<2) )
			{
			ctx.beginPath();
			ctx.arc(koordx2,-koordy2,5,0,2*Math.PI);
			ctx.strokeStyle = 'red';
			ctx.lineWidth = 4;
			ctx.stroke();
			ctx.closePath();	
			}
		}
	}

function pixel_width()
	{

	var lng1=tile2long(xtile, mzoom);
	var lat1=tile2lat(ytile, mzoom);
	//console.log  ("kutxe1: "+lat1+" - "+lng1);

	var lng2=tile2long(xtile+1, mzoom);
	var lat2=tile2lat(ytile+1, mzoom);
	//console.log ("kutxe2: "+lat2+" - "+lng2);

	pix_lat=(lat1-lat2)/256;
//	console.log('pixlat: '+pix_lat);

	pix_lng=(lng2-lng1)/256;
//	console.log('pixlng: '+pix_lng);
	}



function long2tile(lon,zoom) { return (Math.floor((lon+180)/360*Math.pow(2,zoom))); }
function lat2tile(lat,zoom)  { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }

function tile2long(x,z) {
  return (x/Math.pow(2,z)*360-180);
 }
 function tile2lat(y,z) {
  var n=Math.PI-2*Math.PI*y/Math.pow(2,z);
  return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
 }
