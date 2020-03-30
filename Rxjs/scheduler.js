const Observable = require('rxjs');
const asap = Observable.asapScheduler;


/**
 * 1.range是同步的，一次性将数据全部吐出
 * 2.asap尽快产生数据,能有多快就多快.决定了数据的推送节奏不是同步执行的，而是由其他节奏来执行
 * @type {Observable<number>}
 */
// // const source$ = Observable.range(1,3);
// const source$ = Observable.range(1,30, asap);
// console.log('before subscribe');
//
// source$.subscribe(
// 	value => console.log('data: ', value),
// 	error => console.log('error: ', error),
// 	() => console.log('complete')
// );
//
// console.log('after subscribe');

const timeStart = new Date();
const source$ = Observable.range(1,100000,asap);
console.log('before subscribe');
source$.subscribe({
	complete: () => {
		console.log('Time elapsed: ' + (Date.now() - timeStart ) + 'ms');
	}
});

console.log('after subscribe');
