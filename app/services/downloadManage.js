/**
 * Created by han on 2015/11/18.
 * downloadItem说明
 *
 */

var fs = require('fs')
var downloadPath = 'download/'

//todo第二次取文件名有个bug
function getSaveFileName(fileName) {
  if (fs.existsSync(fileName)){
    var reg = new RegExp("\(\d\)?(\.[^\.]+)?$");
    var newFileName = fileName.replace(reg, "\("+fileNameIndex+"\)$2");
    fileNameIndex++;
    return this.getSaveFileName(newFileName);
  }else{
    fileNameIndex = 1;
    return fileName;
  }
}

module.exports = {

  /**
   * 初始化
   * 程序启动时调
   */
  init:function(){


  },
  /*
   * 程序退出时调用
   */
  destroy:function(){


  },

  /**
   * 浏览器下载委托 浏览器webcontent session下载事件转换到此处理
   *
   * @param event
   * @param item
   * @param webContents
   */
  delegate:function(event, item, webContents){

    //todo数据存入

    item.setSavePath(getSaveFileName(downloadPath+item.getFilename()));
    item.on('done', function (e, state) {
      if (state == "completed") {
        if(item.getMimeType() == 'application/x-bittorrent' || /\.torrent$/i.test(item.getFilename())){
          //自动开始bt下载
        }else{
          //触发下载成功事件
        }
      } else {
        //触发下载失败事件
        console.log("Download is cancelled or interrupted that can't be resumed");
      }
    });
  },

  /**
   * 获取下载列表
   * @param max
   * @param type  类型 downlonging|completed|queue|pause
   */
  getQueue:function(max, type){

  },

  /**
   * 添加下载任务
   * @param filename   //文件路径或者http链接
   * @param id        //数据库id如果为空几就是新加入的不为空就是还http链接转入
   * @param callback  //添加完成后回调callback(item)
   */
  add:function(filename, id,  callback){

  }
}
