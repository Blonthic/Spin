function initial(){		//其中声明的变量皆为全局变量
//	timer();
	round = 0;
	times = -1;	
	past = 0;
	now = 0;
	speed = 0;
	started = false;
	timex = new Date();
	startTime = timex.getTime();
}

function start(){
	started = true;
}

function reset(){
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
function detect(){
	if(started){
		times += 1;
		round = parseInt(times / 4);
		timex = new Date();
		pminute = parseInt(round / (timex.getTime() - startTime) * 60000);
		if (times % 12 == 0){		//每4次为1圈，12代表每3圈计算一次速度，以保证稳定。
			past = now;
			now = timex.getTime();
			speed = parseInt(3 / (now - past) * 60000);
			document.getElementById("speed").innerHTML = speed;

		}
		document.getElementById("test").innerHTML = "rounds = " + round;
		document.getElementById("pminute").innerHTML = "Spin per minute = " + pminute;
	}
}

