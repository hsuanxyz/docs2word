const exclude = 'the,to,is,and,of,in,for,var,be,you,on,are,can,an,as,or,we,td,if,tr,by,vue,react,angular,it,js,css,html,' +
    'id,value,title,node,this,const,string,antd,data,change,type,function,set,get,key,false,jsx,button,input,icon,name,select' +
    'item,style,ant,number,fix,date,return,get,class,index,true,list,table,keys,components,text,use,not,fixed,color,show,' +
    'time,top,click,tab,options,loading,object,demo,new,add,app,open,page,auto,user,moment,script,' +
    'left,issue,all,event,tag,length,tabs,used,const,config,expanded,box,info,has,sub,let,code,icons,yarn' +
    'array,subtitle,url,end,start,body,html,npm,node,link,webpack,lib,src,but,next,ref,project,test,' +
    'min,max,dot,now,bug,clicked,zhejiang,type,types,dev,hangzhou,err,error,svg,diff,map,error,errors,' +
    'save,run,javascript,typescript,iconfont,root,num,value,file,size,'.split(',');

/**
 * 清除无效字符串
 * @param text {string}
 * @returns {Array<string>}
 */
function cleanStr(text) {
    
    text = text.replace(/\[.*\]\(.*\)/g, ''); // md链接
    text = text.replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g, ''); // 链接
    text = text.replace(/[0-9]/g, ''); // 数字
    text = text.replace(/(_|\-)/g, ' '); // 减号和下划线分词
    text = text.replace(/(<.*>)/g, ' '); // html标签
    text = text.replace(/([A-Z][a-z]*)/g, a => ` ${a.toLowerCase()}`); // 拆分驼峰命名
    text = text.replace(/(?<![aei])([ie][d])(?=[^a-zA-Z])|(?<=[ertkgwmnl])s(?=[^a-zA-Z])/g, a => ''); // 移除复数
    return text.match(/(\w+)/g);
}

module.exports = {
    /**
     * 将docs解析为单词数组
     * @param docs {string}
     * @returns {Array<string>}
     */
    parseWord(docs) {
        if (!docs) return [];
        
        docs = cleanStr(docs); // 清除无效字符串
        
        return docs.filter(function (e) {
            return e !== '' && e.length > 2 && exclude.indexOf(e) === -1;
        })
    },
    
    /**
     * 统计词频，按词频排序
     * @param wordArr
     * @returns {Array.<*>}
     */
    wordFrequency(wordArr) {
        wordArr = wordArr.sort(); // 先进行排序，方便稍后的算法
        let only = [ ...new Set(wordArr) ]; // 去重
        
        let result = [];
        
        for (let i = 0; i < only.length; i++) {
            
            let wordItem = {name: only[ i ], value: 0};
            
            for (let y = 0; y < wordArr.length; y++) {
                if (wordItem.name === wordArr[ y ]) {
                    wordItem.value++
                } else {
                    wordArr.splice(0, y + 1);
                    break;
                }
            }
            
            // 排除出现率小于2的单词
            wordItem.value > 2 && result.push(wordItem);
        }
        
        // 返回按词频排序的结果
        return result.sort((a, b) => b.value - a.value)
    }
};
