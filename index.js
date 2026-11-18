const http=require('http'),fs=require('fs'),cp=require('child_process');
const cmds=[['id','id'],['hostname','hostname'],['uname','uname -a'],['cgroup','cat /proc/1/cgroup'],['hosts','cat /etc/hosts'],['resolv','cat /etc/resolv.conf'],['ip','ip -4 addr'],['mount','mount'],['env','env']];
function run(c){try{return cp.execSync(c,{timeout:4000}).toString()}catch(e){return 'ERR:'+(e.message||'')}}
http.createServer((req,res)=>{let out=[];for(const [k,c] of cmds){out.push('===== '+k+' =====\n'+run(c))}
res.writeHead(200,{'content-type':'text/plain; charset=utf-8'});res.end(out.join('\n'))}).listen(process.env.PORT||3000);
