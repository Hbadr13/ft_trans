import React, { useEffect, useRef, useState } from 'react';
import Style from '../styles/canvas.module.css'
import { Bacasime_Antique } from 'next/font/google';
const FPS = 1000 / 60
const PLAYER_HEIGHT = 100
const PLAYER_WIDTH = 10
const BALL_START_SPEED = 2
const RADIUS = 10
const VELOCITY = 1
const LEVEL = 0.05
let canvas;
let ctx;
let net;
let player;
let computer;
let ball;
function defineClass(canvas) {
    net = {
        x: canvas.width / 2 - 1,
        y: 0,
        width: 2,
        height: canvas.height,
        color: "#59CE8F"
    };
    player = {
        x: 0,
        y: canvas.height / 2 - PLAYER_HEIGHT / 2,
        height: PLAYER_HEIGHT,
        width: PLAYER_WIDTH,
        color: "#3AB0FF",
        score: 0
    }
    computer = {
        x: canvas.width - PLAYER_WIDTH,
        y: canvas.height / 2 - PLAYER_HEIGHT / 2,
        height: PLAYER_HEIGHT,
        width: PLAYER_WIDTH,
        color: "#3AB0FF",
        score: 0
    }
    ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: RADIUS,
        speed: BALL_START_SPEED,
        color: "red",
        velocityX: VELOCITY,
        velocityY: VELOCITY
    }
}
function drawText(text, x, y, color) {
    ctx.fillStyle = color
    ctx.font = "40px fantasy"
    ctx.fillText(text, x, y)
}



function drawCircle(x, y, r, color) {
    ctx.fillStyle = color
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill()
}
function drawNet() {
    for (var i = 0; i < net.height; i += 15) {
        drawRect(net.x, net.y + i, 4, 10, "green")
    }

}

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)
}
export default function progGame() {
    const reff = useRef(null);
    const [mouseXY, setMouseXY] = useState({ x: 0, y: 0 })
    useEffect((s) => {
        canvas = reff.current;
        ctx = canvas.getContext("2d")
        defineClass(canvas)
        setInterval(game, FPS);
    })
    const handelsetMouseXY = (event) => {
        if (event.clientY - player.height / 2 + 5 > 0 && event.clientY + player.height / 2 < canvas.height + 10)
            player.y = event.clientY - player.height / 2 - 5
        // console.log(`x = ${event.clientX}`)
        // console.log(`y = ${event.clientY}`)
    }
    return (
        <>
            <canvas onMouseMove={handelsetMouseXY} ref={reff} width="600" height="400" className={Style.pong}>
            </canvas >
            <p>Mouse position:({mouseXY.x}, {mouseXY.y}) </p>

        </>
    );
}
function render() {
    drawRect(0, 0, canvas.width, canvas.height, "rgb(255, 221, 71)")
    drawNet()
    drawText(player.score, canvas.width / 4, canvas.height / 5, "#59CE8F")
    drawText(computer.score, (2.6 * canvas.width) / 4, canvas.height / 5, "#59CE8F")

    drawRect(player.x, player.y, player.width, player.height, player.color)
    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color)

    drawCircle(ball.x, ball.y, ball.radius, ball.color)
}
function collision(b, p) {
    b.top = b.y - b.radius
    b.bottom = b.y + b.radius
    b.left = b.x - b.radius
    b.right = b.x + b.radius

    p.top = p.y
    p.bottom = p.y + p.height
    p.left = p.x
    p.right = p.x + p.width
    return (
        b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom
    )
}
function countPoints() {
    if (ball.left <= 1) {
        computer.score += 1
        ball.x = canvas.width / 2
        ball.y = canvas.height / 2
        player.y = canvas.height / 2 - player.height / 2
        ball.speed = BALL_START_SPEED
        ball.velocityX = VELOCITY
        ball.velocityY = VELOCITY
        // computer.score /= 5
    }
    else if (ball.right >= canvas.width) {
        player.score += 1
        ball.x = canvas.width / 2
        ball.y = canvas.height / 2
        player.y = canvas.height / 2 - player.height / 2
        ball.speed = BALL_START_SPEED
        ball.velocityX = VELOCITY
        ball.velocityY = VELOCITY
    }
}

function update() {
    ball.x += (ball.velocityX)
    ball.y += (ball.velocityY)
    computer.y += (ball.y - (computer.height / 2 + computer.y)) * LEVEL
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY *= -1
    }
    let selectPlayer = (ball.x < canvas.width / 2) ? player : computer
    if (collision(ball, selectPlayer)) {
        // if (ball.x < canvas.width / 2) {
        //     //part of player
        //     let option = computer.y + computer.height / 2 > canvas.height / 2 ? 100 : -100

        //     let Whencollesion = ball.y - ((computer.y) + computer.height / 2)
        //     if (Whencollesion > -15 && Whencollesion < 15)
        //         Whencollesion = ball.y - ((computer.y + option) + computer.height / 2)
        //     Whencollesion = (Whencollesion / computer.height) / 2
        //     let angle = Whencollesion * (Math.PI / 4)
        //     ball.velocityX = ball.speed * Math.cos(angle)
        //     ball.velocityY = ball.speed * Math.sin(angle)
        //     ball.speed += 0.2
        //     console.log(angle)

        // }
        // else {
        //part of computer
        let x = ball.klsdfj
        let Whencollesion = ball.y - (selectPlayer.y + (selectPlayer.height / 2));
        // console.log(Whencollesion)
        // let Whenc = Whencollesion / selectPlayer.height / 2;
        Whencollesion = Whencollesion / (selectPlayer.height / 2);
        // console.log((Whenc));
        // console.log(Whenc1);
        // console.log("---------------\n")
        let angle = Whencollesion * (Math.PI / 4);
        let direction = (ball.x < canvas.width / 2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angle);
        ball.velocityY = ball.speed * Math.sin(angle);
        ball.speed += 0.05;
        // }
    }
    countPoints()

}
function game() {
    update()
    render()
}
