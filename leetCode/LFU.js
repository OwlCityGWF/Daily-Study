/*
* 设计并实现最不经常使用(LEFU)缓存的数据结构。它应该支持以下操作get和put
* get(key)如果键存在于缓存中，则获取键的值(总是正数),否则返回-1.
* put(key,value)如果键不存在，请设置或插入值。当缓存达到其容量时.它应该在插入新项目之前，使最不经常使用的项目无效。在此问题中，当存在平局
* (即两个或更多个键具有相同使用频率)时.最近最少使用的键将被去除
 */
/*
* 解题思路
* 一.双hash
* LFU当空间满时,通过访问次数，淘汰访问次数最小的数据
* 二.hash + 平衡二叉树
* 常见的缓存算法
* 1.LRU最近最少使用,如果数据最近被访问过，那么将来被访问的几率也更高
* 2。LFU最不经常使用,如果一个数据在最近一段时间内使用次数很少,那么在将来一段时间内被使用的可能性也很少
* 3。FIFO先进先出。如果一个数据最先进入缓存中。则应该最早淘汰掉
 */
let LFUCache = class {
  constructor(capacity) {
    this.limit = capacity
    this.cache = new Map()
    this.freqMap = new Map()
  }

  get(key) {
    let cache = this.cache
    let r = -1
    if (typeof cache[key] != "undefined") {
      let o = cache[key]
      r = o.value
      //更新频率记录
      this.updateL(key, o)
    }
    return r
  };

  updateL(key, obj){
    let freq = obj.freq;
    let arr = this.freqMap[freq]
    // 删除原频率记录
    this.freqMap[freq].splice(arr.indexOf(key), 1)
    // 清理
    if (this.freqMap[freq].length == 0) delete this.freqMap[freq]
    // 更新频率
    freq = obj.freq = obj.freq + 1
    if (!this.freqMap[freq]) this.freqMap[freq] = []
    this.freqMap[freq].push(key)
  }

  put(key, value) {
    let cache = this.cache
    let limit = this.limit
    let fmap = this.freqMap
    if (limit <= 0) return
    if(typeof key=="undefined"||typeof value=="undefined") throw new Error('key or value is undefined')
    // 存在则直接更新
    if (typeof cache[key] == "undefined") {
      // 获取频率 key
      // 判断容量是否满
      if (Object.keys(cache).length == limit) {
        let fkeys = Object.keys(fmap)
        let freq = fkeys[0]
        // 获取key集合
        let keys = fmap[freq]
        // 淘汰首位
        delete cache[keys.shift()]
        // delete cache[keys[0]];
        // keys.splice(0, 1);
        // 清理
        if (fmap[freq].length == 0) delete fmap[freq]
      }
      // 频率记录是否存在
      if (!fmap[1]) fmap[1] = []
      // 插入新值
      fmap[1].push(key)
      cache[key] = {
        value: value,
        freq: 1 // 默认的频率
      }
    } else {
      cache[key].value = value
      //更新频率记录
      this.updateL(key, cache[key])
    }
  };
};
