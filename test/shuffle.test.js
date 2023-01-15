import { jest } from '@jest/globals'
import { shuffleInplace, shuffle } from '../index.js'

function fac(n) {
   if (n === 0) { return 1 }
   return n * fac(n - 1)
}

function midPointDiff(stats, count) {
   const midPoint = count / Object.keys(stats).length
   return Object.values(stats).reduce((acc, n ) => {
       return Math.max(Math.abs(midPoint-n), acc)
      }, 0) / midPoint * 100
}

describe('shuffleInplace', () => {
   describe('when shuffling a list', ()=>{
      it('returns undefined as it shuffles inplace', ()=>{
         expect(shuffleInplace([1,2,3,4,5])).toEqual(undefined)
      })
      it('does not change the length of the list', ()=> {
         const originalLength = 7
         const list = [...Array(originalLength).keys()]
         shuffleInplace(list)
         expect(list).toHaveLength(originalLength)
      })
      it('keeps all items in the list', ()=>{
         const list = [...Array(13).keys()]
         shuffleInplace(list)
         expect(list).toEqual(expect.arrayContaining([...Array(13).keys()]))
      })
      it('changes the order of the items in the list', ()=> {
         const list = [...Array(9).keys()]
         const originalOrder = list.slice()
         shuffleInplace(list)
         expect(list).not.toEqual(originalOrder)
      })
   })
   describe('when shuffling with customer rng', ()=> {
      it('uses rng to shuffle', () => {
         const positionCount = 9
         const prngMock = jest.fn(()=>Math.random())
         shuffleInplace([...Array(positionCount).keys()], prngMock)
         expect(prngMock.mock.calls.length).toEqual(positionCount)
      })
   })
   describe('when shuffling 4 items 1 000 000 times using Math.random', ()=>{
      it('evenly (diff <2%) distributes the combinations using Math.random', () => {
         // https://spin.atomicobject.com/2014/08/11/fisher-yates-shuffle-randomization-algorithm/
         const count =  1000000
         const stats = {}
         const list = ['a','b','c','d']
         for(var i = 0;i<count;i++) {
            var l = list.slice()
            shuffleInplace(l)
            const key = l.join('')
            stats[key] = (stats[key] ?? 0) + 1
         }
         expect(Object.keys(stats).length).toEqual(fac(list.length))
         expect(midPointDiff(stats, count)).toBeLessThan(2)
      })
   })
})

describe('shuffle', () => {
   describe('when shuffling a list', ()=>{
      it('does not change the length of the list', ()=> {
         const length = 7
         expect(shuffle([...Array(length).keys()])).toHaveLength(length)
      })
      it('has equivalent items in the list', ()=>{
         expect(shuffle([...Array(13).keys()])).toEqual(expect.arrayContaining([...Array(13).keys()]))
      })
      it('changes the order of the items in the list', ()=> {
         const list = [...Array(9).keys()]
         expect(shuffle(list)).not.toEqual(list)
      })
   })
   describe('when shuffling with customer rng', ()=> {
      it('uses rng to shuffle', () => {
         const positionCount = 9
         const prngMock = jest.fn(()=>Math.random())
         shuffle([...Array(positionCount).keys()], prngMock)
         expect(prngMock.mock.calls.length).toEqual(positionCount)
      })
   })
})