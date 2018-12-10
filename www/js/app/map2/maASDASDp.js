var usetouch=false;
var route=new Array();
for (i=0;i<1000 ;i++ )
	{
	route[i]=new Array();
	}
var max_route=-1;
var mlat=41.7152682434194;
var mlng=44.78254072883642;

var markers=new Array();

menu_vis=new Array();
menu_lat=new Array();
menu_lng=new Array();
for (i=0;i<100 ;i++ )
	{
	menu_vis[i]=0;
	}


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

var load_local=2;

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

var super_frame;
var c;
var ctx;

function map_init(w, h, mt, cm)
	{
	live_loc=cm;
	mapw=w;
	maph=h;
	usetouch=mt;
	myframe= document.getElementById("mainframe");
	super_frame= document.getElementById("super_frame");

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

	for (i=0;i<=200 ;i++ )
		{
		document.getElementById("image_pre_loader").innerHTML+="<img id='pre_image_"+i+"'>";		
		}

	set_map_center();
	}

function scrollscr(event)
	{


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
		console.log("mzoom: "+mzoom);
		set_map_center();
		}
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
		x -= super_frame.offsetLeft;
		y -= super_frame.offsetTop;


		}

	else
		{
		if (event.pageX || event.pageY) 
			{ 
		  x = event.pageX;
		  y = event.pageY;
		}
		else { 
		  x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
		  y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
		} 
		x -= super_frame.offsetLeft;
		y -= super_frame.offsetTop;

		}

	mousex=x;
	mousey=y;
	}

function onmyclick(event)
	{
//	parse_mouse(event);

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

function add_route_point(rid, rlat, rlng)
	{
	var cur=route[rid].length;
	route[rid][cur]=new Array();

	route[rid][cur][0]=rlat;
	route[rid][cur][1]=rlng;
	if (rid>max_route)
		{
		max_route=rid;
		}
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

			display_menus();
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

		var mix=mousex;
		var miy=mousey;
		msx=mend_x-mstart_x;
		msy=mend_y-mstart_y;
		mousex=128-msx;
		mousey=128-msy;
		if ( Math.abs(mend_x-mstart_x)<5 && Math.abs(mend_y-mstart_y)<5)
			{
			click_event(mix, miy);
			}
		move_map_by_mouse();

		
		}
	mclicked=false;
	}
function refresh_map()
	{
	set_map_center();
	}

function center_on_marker(marker_id)
	{
	for (i=0;i<markers.length ;i++ )
		{
		if (markers[i][2]==marker_id)
			{
			mlat=markers[i][0];
			mlng=markers[i][1];
			i=markers.length;
			set_map_center();
			}
		}
	}


function center_on_location(lat, lng, new_zoom)
	{
	if (new_zoom>0)
		{
		mzoom=new_zoom;
		}
	mlat=lat;
	mlng=lng;
	set_map_center();
	
	}


function open_menu(men_lat, men_long, menu_id)
	{

	menu_vis[menu_id]=1;
	menu_lat[menu_id]=men_lat;
	menu_lng[menu_id]=men_long;
	
	}

function close_menu(menu_id)
	{
	menu_vis[menu_id]=0;
	document.getElementById("menu_"+menu_id).style.display="none";
	display_menus();
	}

function click_event(x, y)
	{
	var objid=0;
	
	var sx=x+(xmin+sdvigx);
	var sy=y+(ymin-sdvigy);

	lat1=tile2lat(ytile-2, mzoom);
	lng1=tile2long(xtile-2, mzoom);
	
	

	var lngdif=sx*pix_lng;
	var latdif=sy*pix_lat;

	var masx=(mzoom*2-8)/2;
	masx=masx*pix_lng;
	var masy=(mzoom*2-8)/2;
	masy=masy*pix_lat;

	lngdif=lng1+lngdif;
	latdif=lat1-latdif;
	for (i=0;i<markers.length ;i++ )
		{
		if (markers[i][5]==1)
			{

			if (Math.abs(markers[i][0] - latdif)<=masy && Math.abs(markers[i][1]- lngdif)<=masx )
				{
				objid=markers[i][2];
				i=markers.length;
				}
			}
		}
	mshow=click_return(latdif, lngdif, objid);

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
	for (i=0;i<200;i++ )
		{
		document.getElementById("pre_image_"+i).src="";
		}
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
		}
	else
		{
		pre_loader();
		}
	
	if (all_loaded>9)
		{
		draw_route();
		draw_markers();
		if (MyLat!=0)
			{
			draw_my_pos();
			}
		display_menus();
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
		var isfirst=1;
		var thex=0;
		var they=0;
		var end_x=0;
		var end_y=0;
		lat1=tile2lat(ytile-2, mzoom);
		lng1=tile2long(xtile-2, mzoom);
		
	

		for (ki=0;ki<=max_route ;ki++ )
			{
			ctx.beginPath();
			ctx.strokeStyle = 'purple';
			ctx.lineWidth = 3;
			xt=0;yt=0;xt2=0;yt2=0;
			thex=0;they=0;end_x=0;end_y=0;
			isfirst=1;


			stlat=route[ki][0][0];
			stlng=route[ki][0][1];
			enlat=route[ki][route[ki].length-1][0];
			enlng=route[ki][route[ki].length-1][1];


			for (i=0;i<route[ki].length ;i++ )
				{
				ky1=(route[ki][i][0]-lat1)/pix_lat;
				kx1=(route[ki][i][1]-lng1)/pix_lng;
				if (kx1>0 && kx1<1280 && ky1<0 && ky1>-1280)
					{
					if (isfirst==1)
						{
						isfirst=0;
						ctx.moveTo(kx1,-ky1);
						}
					else
						{
						ctx.lineTo(kx1,-ky1);
						}
					}
				}
			ctx.stroke(); 
			ctx.closePath();

		//	yt=lat2tile(stlat, mzoom);
	//		xt=long2tile(stlng, mzoom);
			koordy1=(stlat-lat1)/pix_lat;
			koordx1=(stlng-lng1)/pix_lng;

			if (koordx1>0 && koordx1<1280 && koordy1<0 && koordy1>-1280)
				{
				ctx.beginPath();
				ctx.arc(koordx1,-koordy1,5,0,2*Math.PI);
				ctx.strokeStyle = 'green';
				ctx.lineWidth = 4;
				ctx.stroke();
				ctx.closePath();
				}

			koordy2=(enlat-lat1)/pix_lat;
			koordx2=(enlng-lng1)/pix_lng;
			if (koordx2>0 && koordx2<1280 && koordy2<0 && koordy2>-1280)
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
	}

function draw_markers()
	{
	if (markers.length>0)
		{
		lat1=tile2lat(ytile-2, mzoom);
		lng1=tile2long(xtile-2, mzoom);
		var msize=mzoom*2-8;
		
		for (i=0;i<markers.length ;i++ )
			{
			if (markers[i][5]==1)
				{
				
				ky=(markers[i][0]-lat1)/pix_lat;
				kx=(markers[i][1]-lng1)/pix_lng;
				if (kx>0 && kx<1280 && ky<0 && ky>-1280)
					{
					if (markers[i][4]!="")
						{
						
						ctx.drawImage(markers[i][4],kx-msize/2,-ky-msize/2,msize,msize);
						}
					else
						{
						ctx.beginPath();
						ctx.arc(kx,-ky,msize/2,0,2*Math.PI);
						ctx.strokeStyle = 'yellow';
						ctx.lineWidth = 2;
						ctx.stroke();
						ctx.closePath();
						}				


					ctx.font = "bold "+(msize/2+2)+"px Arial";
					ctx.fillStyle = "black";
					ctx.textAlign = "center";
					ctx.fillText(markers[i][3], kx, -ky-msize/2-4); 


					}
				}
			}
		}
	}

function display_menus()
	{	
	lat1=tile2lat(ytile-2, mzoom);
	lng1=tile2long(xtile-2, mzoom);		
	for (i=0;i<2 ;i++ )
		{
		if (menu_vis[i]==1)
			{
	
			
			ky=(menu_lat[i]-lat1)/pix_lat;
			kx=(menu_lng[i]-lng1)/pix_lng;
			if (kx>0 && kx<1280 && ky<0 && ky>-1280)
				{
				kx=kx-sdvigx-xmin+addx;
				ky=-ky+sdvigy-ymin+addy;

				
				document.getElementById("menu_"+i).style.left=kx+"px";
				document.getElementById("menu_"+i).style.top=ky+"px";
				document.getElementById("menu_"+i).style.display="block";
				}
			else
				{
				document.getElementById("menu_"+i).style.display="none";
				}
			}
		}

	}

function remove_marker(mid)
	{
	for (i=0;i<markers.length ;i++ )
		{
		if (markers[i][2]==mid)
			{
			markers[i][5]=0;
			i=markers.length;
			}

		}

	}
function add_marker(mlat, mlng, mname, mid, micon)
	{
	var cur=markers.length;
	markers[cur]=new Array();
	markers[cur][0]=mlat;
	markers[cur][1]=mlng;
	markers[cur][2]=mid;
	markers[cur][3]=mname;
	if (micon!="")
		{
		markers[cur][4]=new Image();
		markers[cur][4].src=micon;
		}
	else {markers[cur][4]="";}
	markers[cur][5]=1;
	return cur;
	}

function clean_markers()
	{
	markers=new Array();
	}

function clean_routes()
	{
	route=new Array();
	for (i=0;i<1000 ;i++ )
		{
		route[i]=new Array();
		}
	}

function clean_map()
{
clean_markers();
clean_routes();
}
function pixel_width()
	{
	var lng1=tile2long(xtile, mzoom);
	var lat1=tile2lat(ytile, mzoom);
	var lng2=tile2long(xtile+1, mzoom);
	var lat2=tile2lat(ytile+1, mzoom);
	pix_lat=(lat1-lat2)/256;
	pix_lng=(lng2-lng1)/256;
	}

function pre_loader()
	{
	var	minzoom=mzoom-1;
	var maxzoom=mzoom+1;

	if (minzoom<0){minzoom=0;}
	if (maxzoom>18){maxzoom=18;}
	if (load_local==1 && maxzoom>15){maxzoom=15;}
	
	var addr="maps";
	if (load_local==2)
		{
		addr="https://c.tile.openstreetmap.org";
		}
	var cc=0;

	for (z=minzoom;z<=maxzoom ;z++ )
		{
		
		cur_xtile=long2tile(mlng, z);
		cur_ytile=lat2tile(mlat, z);

		for (i=0;i<7 ;i++)
			{
			for (ii=0;ii<7 ;ii++)
				{
				if (z!=mzoom || i<1 || i>5 || ii<1 || ii>5)
					{
					document.getElementById("pre_image_"+cc).src=addr+"/"+z+"/"+(cur_xtile-3+ii)+"/"+(cur_ytile-3+i)+".png";
					cc++;

					}
				}
			}
		}
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
