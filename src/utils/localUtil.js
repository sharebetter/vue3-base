/*
 * @Author: 曾海明
 * @Date: 2019-08-23 14:09:38
 * @LastEditors: 曾海明
 * @LastEditTime: 2021-07-18 09:25:40
 * @Description:
 */
const ls = window.localStorage
export default {
    getItem (key) {
        try {
            return JSON.parse(ls.getItem(key))
        } catch (err) {
            return err
        }
    },
    setItem (key, val) {
        try {
            ls.setItem(key, JSON.stringify(val))
        } catch (err) {
            return err
        }
    },
    clear () {
        ls.clear()
    },
    keys () {
        return ls.keys()
    },
    removeItem (key) {
        ls.removeItem(key)
    }
}
