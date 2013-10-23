define("alipay/qrcode/1.0.3/qrcode",["$","./qrcodealg"],function(a,b,c){var d=a("$"),e=a("./qrcodealg"),f=[],g=function(a){"string"==typeof a&&(a={text:a}),this.options=d.extend({},{text:"",render:"",width:256,height:256,correctLevel:3,background:"#ffffff",foreground:"#000000"},a);for(var b=null,c=0,g=f.length;g>c;c++)if(f[c].text==this.options.text&&f[c].text.correctLevel==this.options.correctLevel){b=f[c].obj;break}if(c==g&&(b=new e(this.options.text,this.options.correctLevel),f.push({text:this.options.text,correctLevel:this.options.correctLevel,obj:b})),this.options.render)switch(this.options.render){case"canvas":return this.createCanvas(b);case"table":return this.createTable(b);case"svg":return this.createSVG(b);default:return this.createDefault(b)}return this.createDefault(b)};g.prototype.createDefault=function(a){var b=document.createElement("canvas");return b.getContext?this.createCanvas(a):(SVG_NS="http://www.w3.org/2000/svg",document.createElementNS&&document.createElementNS(SVG_NS,"svg").createSVGRect?this.createSVG(a):this.createTable(a))},g.prototype.createCanvas=function(a){var b=document.createElement("canvas");b.width=this.options.width,b.height=this.options.height;for(var c=b.getContext("2d"),d=(this.options.width/a.getModuleCount()).toPrecision(4),e=this.options.height/a.getModuleCount().toPrecision(4),f=0;f<a.getModuleCount();f++)for(var g=0;g<a.getModuleCount();g++){c.fillStyle=a.modules[f][g]?this.options.foreground:this.options.background;var h=Math.ceil((g+1)*d)-Math.floor(g*d),i=Math.ceil((f+1)*d)-Math.floor(f*d);c.fillRect(Math.round(g*d),Math.round(f*e),h,i)}return b},g.prototype.createTable=function(a){var b=[];b.push('<table style="border:0px; margin:0px; padding:0px; border-collapse:collapse; background-color: '+this.options.background+';">');var c=Math.floor(this.options.width/a.getModuleCount()),d=Math.floor(this.options.height/a.getModuleCount());2>c&&(c=2),2>d&&(d=2),foreTd='<td style="border:0px; margin:0px; padding:0px; width:'+c+"px; background-color: "+this.options.foreground+'"></td>',backTd='<td style="border:0px; margin:0px; padding:0px; width:'+c+"px; background-color: "+this.options.background+'"></td>',l=a.getModuleCount();for(var e=0;l>e;e++){b.push('<tr style="border:0px; margin:0px; padding:0px; height: '+d+'px">');for(var f=0;l>f;f++)b.push(a.modules[e][f]?foreTd:backTd);b.push("</tr>")}b.push("</table>");var g=document.createElement("span");return g.innerHTML=b.join(""),g.firstChild},g.prototype.createSVG=function(a){for(var b='<svg xmlns="http://www.w3.org/2000/svg" height="'+this.options.height+'" width="'+this.options.width+'">',c=Math.floor(this.options.width/a.getModuleCount()),e=Math.floor(this.options.height/a.getModuleCount()),f="<rect ",g=' width="'+c+'" height="'+e+'" fill="'+this.options.foreground+'"></rect>',h=' width="'+c+'" height="'+e+'" fill="'+this.options.background+'"></rect>',i=0;i<a.getModuleCount();i++)for(var j=0;j<a.getModuleCount();j++)b+=f+' y="'+i*e+'"" x="'+j*c+'"',b+=a.modules[i][j]?g:h;return b+="</svg>",$svg=d(b),$svg[0]},c.exports=g}),define("alipay/qrcode/1.0.3/qrcodealg",[],function(a,b,c){function d(a,b){this.typeNumber=-1,this.errorCorrectLevel=b,this.modules=null,this.moduleCount=0,this.dataCache=null,this.rsBlocks=null,this.totalDataCount=-1,this.data=a,this.make()}function e(a,b){if(void 0==a.length)throw new Error(a.length+"/"+b);for(var c=0;c<a.length&&0==a[c];)c++;this.num=new Array(a.length-c+b);for(var d=0;d<a.length-c;d++)this.num[d]=a[d+c]}function f(){this.buffer=new Array,this.length=0}d.prototype={constructor:d,getModuleCount:function(){return this.moduleCount},make:function(){this.getRightType(),this.dataCache=this.createData(),this.createQrcode()},makeImpl:function(a){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var b=0;b<this.moduleCount;b++)this.modules[b]=new Array(this.moduleCount);this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(!0,a),this.typeNumber>=7&&this.setupTypeNumber(!0),this.mapData(this.dataCache,a)},setupPositionProbePattern:function(a,b){for(var c=-1;7>=c;c++)if(!(-1>=a+c||this.moduleCount<=a+c))for(var d=-1;7>=d;d++)-1>=b+d||this.moduleCount<=b+d||(this.modules[a+c][b+d]=c>=0&&6>=c&&(0==d||6==d)||d>=0&&6>=d&&(0==c||6==c)||c>=2&&4>=c&&d>=2&&4>=d?!0:!1)},createQrcode:function(){for(var a=0,b=0,c=null,d=0;8>d;d++){this.makeImpl(d);var e=i.getLostPoint(this);(0==d||a>e)&&(a=e,b=d,c=this.modules)}this.modules=c,this.setupTypeInfo(!1,b),this.typeNumber>=7&&this.setupTypeNumber(!1)},setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2,null==this.modules[6][a]&&(this.modules[6][a]=0==a%2))},setupPositionAdjustPattern:function(){for(var a=i.getPatternPosition(this.typeNumber),b=0;b<a.length;b++)for(var c=0;c<a.length;c++){var d=a[b],e=a[c];if(null==this.modules[d][e])for(var f=-2;2>=f;f++)for(var g=-2;2>=g;g++)this.modules[d+f][e+g]=-2==f||2==f||-2==g||2==g||0==f&&0==g?!0:!1}},setupTypeNumber:function(a){for(var b=i.getBCHTypeNumber(this.typeNumber),c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[Math.floor(c/3)][c%3+this.moduleCount-8-3]=d,this.modules[c%3+this.moduleCount-8-3][Math.floor(c/3)]=d}},setupTypeInfo:function(a,b){for(var c=g[this.errorCorrectLevel]<<3|b,d=i.getBCHTypeInfo(c),e=0;15>e;e++){var f=!a&&1==(1&d>>e);6>e?this.modules[e][8]=f:8>e?this.modules[e+1][8]=f:this.modules[this.moduleCount-15+e][8]=f;var f=!a&&1==(1&d>>e);8>e?this.modules[8][this.moduleCount-e-1]=f:9>e?this.modules[8][15-e-1+1]=f:this.modules[8][15-e-1]=f}this.modules[this.moduleCount-8][8]=!a},createData:function(){var a=new f,b=this.typeNumber>9?16:8;a.put(4,4),a.put(this.data.length,b);for(var c=0,e=this.data.length;e>c;c++)a.put(this.data.charCodeAt(c),8);for(a.length+4<=8*this.totalDataCount&&a.put(0,4);0!=a.length%8;)a.putBit(!1);for(;;){if(a.length>=8*this.totalDataCount)break;if(a.put(d.PAD0,8),a.length>=8*this.totalDataCount)break;a.put(d.PAD1,8)}return this.createBytes(a)},createBytes:function(a){for(var b=0,c=0,d=0,f=this.rsBlock.length/3,g=new Array,h=0;f>h;h++)for(var j=this.rsBlock[3*h+0],k=this.rsBlock[3*h+1],l=this.rsBlock[3*h+2],m=0;j>m;m++)g.push([l,k]);for(var n=new Array(g.length),o=new Array(g.length),p=0;p<g.length;p++){var q=g[p][0],r=g[p][1]-q;c=Math.max(c,q),d=Math.max(d,r),n[p]=new Array(q);for(var h=0;h<n[p].length;h++)n[p][h]=255&a.buffer[h+b];b+=q;var s=i.getErrorCorrectPolynomial(r),t=new e(n[p],s.getLength()-1),u=t.mod(s);o[p]=new Array(s.getLength()-1);for(var h=0;h<o[p].length;h++){var v=h+u.getLength()-o[p].length;o[p][h]=v>=0?u.get(v):0}}for(var w=new Array(this.totalDataCount),x=0,h=0;c>h;h++)for(var p=0;p<g.length;p++)h<n[p].length&&(w[x++]=n[p][h]);for(var h=0;d>h;h++)for(var p=0;p<g.length;p++)h<o[p].length&&(w[x++]=o[p][h]);return w},mapData:function(a,b){for(var c=-1,d=this.moduleCount-1,e=7,f=0,g=this.moduleCount-1;g>0;g-=2)for(6==g&&g--;;){for(var h=0;2>h;h++)if(null==this.modules[d][g-h]){var j=!1;f<a.length&&(j=1==(1&a[f]>>>e));var k=i.getMask(b,d,g-h);k&&(j=!j),this.modules[d][g-h]=j,e--,-1==e&&(f++,e=7)}if(d+=c,0>d||this.moduleCount<=d){d-=c,c=-c;break}}}},d.PAD0=236,d.PAD1=17;for(var g=[1,0,3,2],h={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},i={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var b=a<<10;i.getBCHDigit(b)-i.getBCHDigit(i.G15)>=0;)b^=i.G15<<i.getBCHDigit(b)-i.getBCHDigit(i.G15);return(a<<10|b)^i.G15_MASK},getBCHTypeNumber:function(a){for(var b=a<<12;i.getBCHDigit(b)-i.getBCHDigit(i.G18)>=0;)b^=i.G18<<i.getBCHDigit(b)-i.getBCHDigit(i.G18);return a<<12|b},getBCHDigit:function(a){for(var b=0;0!=a;)b++,a>>>=1;return b},getPatternPosition:function(a){return i.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,b,c){switch(a){case h.PATTERN000:return 0==(b+c)%2;case h.PATTERN001:return 0==b%2;case h.PATTERN010:return 0==c%3;case h.PATTERN011:return 0==(b+c)%3;case h.PATTERN100:return 0==(Math.floor(b/2)+Math.floor(c/3))%2;case h.PATTERN101:return 0==b*c%2+b*c%3;case h.PATTERN110:return 0==(b*c%2+b*c%3)%2;case h.PATTERN111:return 0==(b*c%3+(b+c)%2)%2;default:throw new Error("bad maskPattern:"+a)}},getErrorCorrectPolynomial:function(a){for(var b=new e([1],0),c=0;a>c;c++)b=b.multiply(new e([1,j.gexp(c)],0));return b},getLostPoint:function(a){for(var b=a.getModuleCount(),c=0,d=0,e=0;b>e;e++)for(var f=0,g=a.modules[e][0],h=0;b>h;h++){var i=a.modules[e][h];if(b-6>h&&i&&!a.modules[e][h+1]&&a.modules[e][h+2]&&a.modules[e][h+3]&&a.modules[e][h+4]&&!a.modules[e][h+5]&&a.modules[e][h+6]&&(b-10>h?a.modules[e][h+7]&&a.modules[e][h+8]&&a.modules[e][h+9]&&a.modules[e][h+10]&&(c+=40):h>3&&a.modules[e][h-1]&&a.modules[e][h-2]&&a.modules[e][h-3]&&a.modules[e][h-4]&&(c+=40)),b-1>e&&b-1>h){var j=0;i&&j++,a.modules[e+1][h]&&j++,a.modules[e][h+1]&&j++,a.modules[e+1][h+1]&&j++,(0==j||4==j)&&(c+=3)}g^i?f++:(g=i,f>=5&&(c+=3+f-5),f=1),i&&d++}for(var h=0;b>h;h++)for(var f=0,g=a.modules[0][h],e=0;b>e;e++){var i=a.modules[e][h];b-6>e&&i&&!a.modules[e+1][h]&&a.modules[e+2][h]&&a.modules[e+3][h]&&a.modules[e+4][h]&&!a.modules[e+5][h]&&a.modules[e+6][h]&&(b-10>e?a.modules[e+7][h]&&a.modules[e+8][h]&&a.modules[e+9][h]&&a.modules[e+10][h]&&(c+=40):e>3&&a.modules[e-1][h]&&a.modules[e-2][h]&&a.modules[e-3][h]&&a.modules[e-4][h]&&(c+=40)),g^i?f++:(g=i,f>=5&&(c+=3+f-5),f=1)}var k=Math.abs(100*d/b/b-50)/5;return c+=10*k}},j={glog:function(a){if(1>a)throw new Error("glog("+a+")");return j.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;a>=256;)a-=255;return j.EXP_TABLE[a]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},k=0;8>k;k++)j.EXP_TABLE[k]=1<<k;for(var k=8;256>k;k++)j.EXP_TABLE[k]=j.EXP_TABLE[k-4]^j.EXP_TABLE[k-5]^j.EXP_TABLE[k-6]^j.EXP_TABLE[k-8];for(var k=0;255>k;k++)j.LOG_TABLE[j.EXP_TABLE[k]]=k;e.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var b=new Array(this.getLength()+a.getLength()-1),c=0;c<this.getLength();c++)for(var d=0;d<a.getLength();d++)b[c+d]^=j.gexp(j.glog(this.get(c))+j.glog(a.get(d)));return new e(b,0)},mod:function(a){var b=this.getLength(),c=a.getLength();if(0>b-c)return this;for(var d=new Array(b),f=0;b>f;f++)d[f]=this.get(f);for(;d.length>=c;){for(var g=j.glog(d[0])-j.glog(a.get(0)),f=0;f<a.getLength();f++)d[f]^=j.gexp(j.glog(a.get(f))+g);for(;0==d[0];)d.shift()}return new e(d,0)}},RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],d.prototype.getRightType=function(){for(var a=1;41>a;a++){var b=RS_BLOCK_TABLE[4*(a-1)+this.errorCorrectLevel];if(void 0==b)throw new Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+this.errorCorrectLevel);for(var c=b.length/3,d=0,e=0;c>e;e++){var f=b[3*e+0],g=b[3*e+2];d+=g*f}var h=a>9?2:1;if(this.data.length+h<d||40==a){this.typeNumber=a,this.rsBlock=b,this.totalDataCount=d;break}}},f.prototype={get:function(a){var b=Math.floor(a/8);return 1&this.buffer[b]>>>7-a%8},put:function(a,b){for(var c=0;b>c;c++)this.putBit(1&a>>>b-c-1)},putBit:function(a){var b=Math.floor(this.length/8);this.buffer.length<=b&&this.buffer.push(0),a&&(this.buffer[b]|=128>>>this.length%8),this.length++}},c.exports=d});
