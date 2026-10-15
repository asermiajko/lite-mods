/*
 * lm-podbor — разметка стояков (секция + ось) по планам этажей, 2026-10-15.
 *  facades — сколько сторон с окнами (1 — окна на одну сторону, 2+ — угловая);
 *  wall    — что за стеной спальни: outer | neighbor_bedroom | neighbor_living | corridor | stair | lift;
 *  near    — сколько чужих входных дверей рядом на площадке; opp — дверь напротив соседа;
 *  dirs    — стороны света окон (только где известен азимут севера на плане).
 * Двор или улица и расстояние до дороги по планам секций не определяются — остаются допущения model.js.
 * Как размечено и где не размечено — blocks/lm-podbor/notes.md.
 */
window.LM_PODBOR_STACKS = window.LM_PODBOR_STACKS || {};
window.LM_PODBOR_STACKS['ohqmp.dev-lite.ru'] = {
 "00ce8a46-0b3c-4dd1-b3a2-ab392c99d001:1": {
  "facades": 1,
  "near": 2,
  "opp": false,
  "wall": "neighbor_living",
  "dirs": [
   "north"
  ]
 },
 "00ce8a46-0b3c-4dd1-b3a2-ab392c99d001:2": {
  "facades": 2,
  "near": 2,
  "opp": true,
  "wall": "neighbor_bedroom",
  "dirs": [
   "east",
   "north"
  ]
 },
 "00ce8a46-0b3c-4dd1-b3a2-ab392c99d001:3": {
  "facades": 2,
  "near": 1,
  "opp": true,
  "wall": "neighbor_bedroom",
  "dirs": [
   "south",
   "east"
  ]
 },
 "00ce8a46-0b3c-4dd1-b3a2-ab392c99d001:4": {
  "facades": 1,
  "near": 1,
  "opp": false,
  "wall": "neighbor_living",
  "dirs": [
   "south"
  ]
 },
 "00ce8a46-0b3c-4dd1-b3a2-ab392c99d001:5": {
  "facades": 1,
  "near": 1,
  "opp": false,
  "wall": "neighbor_bedroom",
  "dirs": [
   "south"
  ]
 },
 "00ce8a46-0b3c-4dd1-b3a2-ab392c99d001:6": {
  "facades": 2,
  "near": 1,
  "opp": true,
  "wall": "outer",
  "dirs": [
   "south",
   "west"
  ]
 },
 "00ce8a46-0b3c-4dd1-b3a2-ab392c99d001:7": {
  "facades": 2,
  "near": 2,
  "opp": true,
  "wall": "outer",
  "dirs": [
   "west",
   "north"
  ]
 },
 "00ce8a46-0b3c-4dd1-b3a2-ab392c99d001:8": {
  "facades": 1,
  "near": 2,
  "opp": false,
  "wall": "neighbor_living",
  "dirs": [
   "north"
  ]
 },
 "9957db46-65d0-4fba-b483-37da7d729845:1": {
  "facades": 1,
  "near": 2,
  "opp": false,
  "wall": "neighbor_living"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:2": {
  "facades": 1,
  "near": 3,
  "opp": false,
  "wall": "outer"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:3": {
  "facades": 2,
  "near": 2,
  "opp": false,
  "wall": "neighbor_living"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:4": {
  "facades": 2,
  "near": 2,
  "opp": true,
  "wall": "outer"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:5": {
  "facades": 1,
  "near": 2,
  "opp": true,
  "wall": "neighbor_bedroom"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:6": {
  "facades": 1,
  "near": 1,
  "opp": false,
  "wall": "neighbor_bedroom"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:7": {
  "facades": 1,
  "near": 1,
  "opp": false,
  "wall": "neighbor_living"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:8": {
  "facades": 1,
  "near": 3,
  "opp": false,
  "wall": "neighbor_bedroom"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:9": {
  "facades": 2,
  "near": 3,
  "opp": false,
  "wall": "neighbor_living"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:10": {
  "facades": 1,
  "near": 3,
  "opp": true,
  "wall": "neighbor_bedroom"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:11": {
  "facades": 2,
  "near": 3,
  "opp": true,
  "wall": "neighbor_living"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:12": {
  "facades": 1,
  "near": 1,
  "opp": false,
  "wall": "neighbor_bedroom"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:13": {
  "facades": 1,
  "near": 1,
  "opp": false,
  "wall": "neighbor_bedroom"
 },
 "561b8838-1126-4685-82ec-59113bae3833:1": {
  "facades": 2,
  "near": 1,
  "opp": false,
  "wall": "outer"
 },
 "561b8838-1126-4685-82ec-59113bae3833:2": {
  "facades": 1,
  "near": 1,
  "opp": false,
  "wall": "neighbor_bedroom"
 },
 "561b8838-1126-4685-82ec-59113bae3833:3": {
  "facades": 2,
  "near": 1,
  "opp": true,
  "wall": "outer"
 },
 "561b8838-1126-4685-82ec-59113bae3833:4": {
  "facades": 2,
  "near": 2,
  "opp": true,
  "wall": "outer"
 },
 "561b8838-1126-4685-82ec-59113bae3833:5": {
  "facades": 1,
  "near": 2,
  "opp": false,
  "wall": "neighbor_bedroom"
 },
 "561b8838-1126-4685-82ec-59113bae3833:6": {
  "facades": 1,
  "near": 2,
  "opp": false,
  "wall": "neighbor_living"
 },
 "561b8838-1126-4685-82ec-59113bae3833:7": {
  "facades": 1,
  "near": 2,
  "opp": false,
  "wall": "neighbor_bedroom"
 },
 "561b8838-1126-4685-82ec-59113bae3833:8": {
  "facades": 2,
  "near": 1,
  "opp": false,
  "wall": "outer"
 },
 "6b903d16-d1ba-49e8-b41a-0bdd9dec77b5:1": {
  "facades": 2,
  "near": 1,
  "opp": false
 },
 "6b903d16-d1ba-49e8-b41a-0bdd9dec77b5:2": {
  "facades": 1,
  "near": 1,
  "opp": false
 },
 "6b903d16-d1ba-49e8-b41a-0bdd9dec77b5:3": {
  "facades": 2,
  "near": 1,
  "opp": false
 },
 "6b903d16-d1ba-49e8-b41a-0bdd9dec77b5:4": {
  "facades": 2,
  "near": 1,
  "opp": false
 },
 "6b903d16-d1ba-49e8-b41a-0bdd9dec77b5:5": {
  "facades": 1,
  "near": 2,
  "opp": false
 },
 "6b903d16-d1ba-49e8-b41a-0bdd9dec77b5:6": {
  "facades": 1,
  "near": 2,
  "opp": false
 },
 "6b903d16-d1ba-49e8-b41a-0bdd9dec77b5:7": {
  "facades": 2,
  "near": 1,
  "opp": false
 },
 "3cce9ecc-d8d3-40a4-9f17-39d8813e17be:1": {
  "facades": 2,
  "near": 1,
  "opp": true,
  "wall": "outer"
 },
 "3cce9ecc-d8d3-40a4-9f17-39d8813e17be:2": {
  "facades": 1,
  "near": 1,
  "opp": true,
  "wall": "neighbor_living"
 },
 "3cce9ecc-d8d3-40a4-9f17-39d8813e17be:3": {
  "facades": 2,
  "near": 1,
  "opp": true,
  "wall": "neighbor_living"
 },
 "3cce9ecc-d8d3-40a4-9f17-39d8813e17be:4": {
  "facades": 1,
  "near": 1,
  "opp": true,
  "wall": "neighbor_bedroom"
 },
 "3cce9ecc-d8d3-40a4-9f17-39d8813e17be:5": {
  "facades": 2,
  "near": 1,
  "opp": false,
  "wall": "corridor"
 },
 "3cce9ecc-d8d3-40a4-9f17-39d8813e17be:6": {
  "facades": 1,
  "near": 1,
  "opp": true,
  "wall": "neighbor_bedroom"
 },
 "3cce9ecc-d8d3-40a4-9f17-39d8813e17be:7": {
  "facades": 2,
  "near": 1,
  "opp": true,
  "wall": "neighbor_bedroom"
 },
 "c031aae6-29d8-4e9d-9059-7f8e99f88600:1": {
  "facades": 2,
  "near": 1,
  "opp": true,
  "wall": "neighbor_bedroom"
 },
 "c031aae6-29d8-4e9d-9059-7f8e99f88600:2": {
  "facades": 2,
  "near": 2,
  "opp": true,
  "wall": "outer"
 },
 "c031aae6-29d8-4e9d-9059-7f8e99f88600:3": {
  "facades": 1,
  "near": 1,
  "opp": true,
  "wall": "outer"
 },
 "c031aae6-29d8-4e9d-9059-7f8e99f88600:4": {
  "facades": 2,
  "near": 1,
  "opp": true,
  "wall": "outer"
 },
 "c031aae6-29d8-4e9d-9059-7f8e99f88600:5": {
  "facades": 1,
  "near": 1,
  "opp": false,
  "wall": "neighbor_living"
 },
 "c031aae6-29d8-4e9d-9059-7f8e99f88600:6": {
  "facades": 2,
  "near": 1,
  "opp": false,
  "wall": "neighbor_living"
 },
 "c031aae6-29d8-4e9d-9059-7f8e99f88600:7": {
  "facades": 1,
  "near": 2,
  "opp": true,
  "wall": "outer"
 },
 "c031aae6-29d8-4e9d-9059-7f8e99f88600:8": {
  "facades": 1,
  "near": 1,
  "opp": true,
  "wall": "neighbor_bedroom"
 },
 "c031aae6-29d8-4e9d-9059-7f8e99f88600:9": {
  "facades": 1,
  "near": 2,
  "opp": true,
  "wall": "neighbor_bedroom"
 },
 "7093215f-bcb3-4f97-80fe-354ecb0e9c51:1": {
  "facades": 2,
  "near": 1,
  "opp": true,
  "wall": "outer"
 },
 "7093215f-bcb3-4f97-80fe-354ecb0e9c51:2": {
  "facades": 1,
  "near": 1,
  "opp": false,
  "wall": "neighbor_bedroom"
 },
 "7093215f-bcb3-4f97-80fe-354ecb0e9c51:5": {
  "facades": 1,
  "near": 2,
  "opp": false,
  "wall": "neighbor_living"
 },
 "7093215f-bcb3-4f97-80fe-354ecb0e9c51:6": {
  "facades": 1,
  "near": 2,
  "opp": false,
  "wall": "neighbor_bedroom"
 },
 "7093215f-bcb3-4f97-80fe-354ecb0e9c51:7": {
  "facades": 2,
  "near": 1,
  "opp": true,
  "wall": "outer"
 },
 "b42cb203-60e9-446a-973a-66a44f3a26c7:2": {
  "facades": 2,
  "near": 2,
  "opp": false,
  "wall": "outer"
 },
 "b42cb203-60e9-446a-973a-66a44f3a26c7:4": {
  "facades": 2,
  "near": 2,
  "opp": false,
  "wall": "neighbor_living"
 },
 "b42cb203-60e9-446a-973a-66a44f3a26c7:10": {
  "facades": 1,
  "near": 1,
  "opp": false,
  "wall": "neighbor_bedroom"
 }
};
