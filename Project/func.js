started = false;
function initial()
{		//其中声明的变量皆为全局变量
//	timer();
	round = 0;
	times = -1;	
	past = 0;
	now = 0;
	speed = 0;
	started = false;
	timex = new Date();
	startTime = timex.getTime();
	cup = [1,1,1,1];
	speedArray = new Array(1000);
	for (var i = 0;i<1000;i++)
	{
		speedArray[i] = 0 ;
	}
	speedIndex = 0;
}

function start()
{
	started = true;
}

function reset()
{
	initial();
	// document.getElementById("speed").innerHTML = "0";
	// document.getElementById("test").innerHTML = "rounds = 0";
	// document.getElementById("pminute").innerHTML = "Spin per minute = 0"
}

/*function timer(){
	time = 0;
	count();
}

function count(){
	time += 1
	document.getElementById("time").innerHTML = "Time passed: "+(time / 100).toFixed(2)+" s";
	setTimeout("count();",10)
}
*/
function detect(num)
{
	if(started)
	{
		if(cup[num]==1)
		{
//			document.getElementById("teststats").innerHTML = "detected!";
			times += 1;
			round = parseInt(times / 4);
			timex = new Date();
			pminute = parseInt(round / (timex.getTime() - startTime) * 60000);
			if (times % 4 == 0)
			{		//每4次为1圈，12代表每3圈计算一次速度，以保证稳定。
				past = now;
				now = timex.getTime();
				speed = parseInt(1 / (now - past) * 60000);
				document.getElementById("speed").innerHTML = speed;
				speedArray[speedIndex] = speed;
				speedIndex ++;
				maxSpeed = Math.max.apply(null,speedArray);
				document.getElementById("maxSpeed").innerHTML = "Max Speed = "+ maxSpeed;
				clipheight = 692 - (speed/477) * 692;
				document.getElementById("metre").style.clip = "rect("+clipheight+"px,auto,auto,auto)";
			}
			document.getElementById("time").innerHTML = "Time = "+ ((timex.getTime() - startTime)/1000).toFixed(2) +" s"
			document.getElementById("test").innerHTML = "rounds = " + round;
			document.getElementById("pminute").innerHTML = "Spins per minute = " + pminute;
			switch(num)
			{
				case 0:
				cup[0] = 0;
				cup[1] = 1;
				cup[2] = 0;
				cup[3] = 1;
				break;

				case 1:
				cup[0] = 1;
				cup[1] = 0;
				cup[2] = 1;
				cup[3] = 0;
				break;

				case 2:
				cup[0] = 0;
				cup[1] = 1;
				cup[2] = 0;
				cup[3] = 1;
				break;

				case 3:
				cup[0] = 1;
				cup[1] = 0;
				cup[2] = 1;
				cup[3] = 0;
				break;
			}
		}
	}
}
//转盘旋转代码
var rotateDegree = 0;
pointx = 520;
pointy = 357; 
nowDegree = 0;
function rotater(_deg)
{
	rotateDegree = _deg;
	rotateCSSCode = "transform: rotate(" +rotateDegree+ "deg);-ms-transform: rotate(" +rotateDegree+ "deg);-webkit-transform: rotate(" +rotateDegree+ "deg);-o-transform: rotate(" +rotateDegree+ "deg);-moz-transform: rotate(" +rotateDegree+ "deg);";
	document.getElementById("circle").style.cssText = rotateCSSCode;
}
function rotate(event){
	if(started){
//		alert(event.clientY);
		rotater((Math.atan2(event.clientY - pointy, event.clientX - pointx) - nowDegree) * Math.PI);
		nowDegree -= Math.atan2(event.clientY - pointy, event.clientX - pointx);

	}
}
//this.rotate( Math.atan2( e.clientY - this._mrY, e.clientX - this._mrX ) - this._mrRadian );
