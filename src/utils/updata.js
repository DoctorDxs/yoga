import { updataTrend,  updateEval, getSomeOneAnswer} from '../fetch/api.js'




// 只传news_id  这是关于列表的处理
export function updataTrendOne(trendList, callback) {
  let trendUpdate = localStorage.getItem("trendUpdate")
  if (trendUpdate) {
    trendUpdate = JSON.parse(trendUpdate)
    const index = trendUpdate.trendIndex
    const doWhat = trendUpdate.doWhat
    if (doWhat == 2) {
      callback(true) 
      localStorage.removeItem('trendUpdate')
    } else if (doWhat == 1){
      if (trendList[index]) {
        let id = trendList[index].id
        updataTrend(id).then(res => {
          if (res.state == 200) {
            let data = res.data
            if (data.img_paths) {
              data.img_paths = res.data.img_paths.split(',')
            } else {
              data.img_paths = []
            }
            trendList.splice(index, 1, res.data)
          } else {
            trendList.splice(index, 1)
          }
        })
      } else {
        callback(trendList) 
      }
    } else {
      callback(trendList) 
    }
  }
}

// 这是关于详情内单条动态的处理
export function updataDetailTrend(id,callback) {
    updataTrend(id).then(res => {
      if (res.state == 200) {
        let data = res.data
        if (data.img_paths) {
          data.img_paths = data.img_paths.split(',')
        } else {
          data.img_paths = []
        };
        callback(data)
      } else {
        alert(res.msg)
      }
    })

}


// 传 news_id， comment_id 关于评论列表   修改

export function updateEvalOne(evalList, callback) {
  let evalUpdate = localStorage.getItem("evalUpdate")
  if (evalUpdate) {
    evalUpdate = JSON.parse(evalUpdate)
    const index = evalUpdate.evalIndex
    const doWhat = evalUpdate.doWhat
    if (doWhat == 1){
      if (evalList[index]) {
        let id = evalList[index].id
          updateEval('comment_id=' + id).then(res => {
            if (res.state == 200) {
              let data = res.data
              if (data.img_paths) {
                data.img_paths = data.img_paths.split(',')
              } else {
                data.img_paths = []
              }
              evalList.splice(index, 1, data)
            } else {
              evalList.splice(index, 1)
            }
            callback(evalList) 
        })
      }
    }
  }
}

 
// 关于 某一条详情的评论   -1 表示 不存在 删除，如果存在的话将返回更新后的数据
export function updateDetailEval(params,callback) {
  updateEval(params).then(res => {
    if (res.state == 200) {
      let data = res.data
      if (data.img_path) {
        data.img_path = data.img_path.split(',')
      } else {
        data.img_path = []
      };
      if (data.comments.length) {
        data.comments.forEach(item => {
          if (item.img_path) {
            item.img_path = item.img_path.split(',')
          } else {
            item.img_path = []
          }
        })
      };
      callback(data)
    }
  })
}




// questionDetail  页面数据的更新

export function updataAnswer(answersList, callback) {
  let answerUpdate = localStorage.getItem("answerUpdate")
  console.log(answersList)
  if (answerUpdate) {
    answerUpdate = JSON.parse(answerUpdate)
    const index = answerUpdate.answerIndex
    const doWhat = answerUpdate.doWhat
    if (doWhat == 2) {
      callback(true) 
      localStorage.removeItem('trendUpdate')
    } else if (doWhat == 1){
      if (answersList[index]) {
        let id = answersList[index].id
        getSomeOneAnswer(id).then(res => {
          if (res.state == 200) {
            if (res.data.detail.length > 0) {
              let detail = res.data.detail[0]
              let comments = detail.comments
              if (detail.img_paths) {
                detail.img_paths = detail.img_paths.split(',')
              } else {
                detail.img_paths = []
              }
              if (comments.length > 0) {
                comments.forEach((item, index) => {
                  if (item.img_path) {
                    item.img_path = item.img_path.split(',')
                  } else {
                    item.img_path = []
                  }
                })
              };
              detail.comments = comments
              answersList.splice(index, 1, detail)
            }
            callback(answersList)
          } else {
            answersList.splice(index, 1)
            callback(answersList)
          }
        })
      } else {
        callback(answersList) 
      }
    } else {
      callback(answersList) 
    }
  }
}
