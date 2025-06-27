class FlappyBird {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 400;
        this.canvas.height = 600;
        
        // Game states
        this.gameState = 'start'; // 'start', 'playing', 'gameOver'
        this.score = 0;
        this.bestScore = localStorage.getItem('bestScore') || 0;
        
        // Bird properties
        this.bird = {
            x: 80,
            y: 250,
            width: 30,
            height: 25,
            velocity: 0,
            gravity: 0.5,
            jumpForce: -8,
            color: '#FFD700'
        };
        
        // Pipe properties
        this.pipes = [];
        this.pipeWidth = 60;
        this.pipeGap = 150;
        this.pipeSpeed = 2;
        this.pipeSpacing = 200;
        this.lastPipeX = this.canvas.width;
        
        // Ground
        this.groundHeight = 50;
        this.groundY = this.canvas.height - this.groundHeight;
        
        // Clouds for background
        this.clouds = [];
        this.initClouds();
        
        // UI elements
        this.startScreen = document.getElementById('startScreen');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.gameUI = document.getElementById('gameUI');
        this.scoreElement = document.getElementById('score');
        this.finalScoreElement = document.getElementById('finalScore');
        this.bestScoreElement = document.getElementById('bestScore');
        this.restartBtn = document.getElementById('restartBtn');
        
        this.setupEventListeners();
        this.updateUI();
        this.gameLoop();
    }
    
    initClouds() {
        for (let i = 0; i < 5; i++) {
            this.clouds.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * (this.canvas.height * 0.3),
                width: 60 + Math.random() * 40,
                height: 30 + Math.random() * 20,
                speed: 0.3 + Math.random() * 0.5
            });
        }
    }
    
    setupEventListeners() {
        // Space key and mouse click
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.handleInput();
            }
        });
        
        this.canvas.addEventListener('click', () => {
            this.handleInput();
        });
        
        this.restartBtn.addEventListener('click', () => {
            this.restart();
        });
    }
    
    handleInput() {
        if (this.gameState === 'start') {
            this.startGame();
        } else if (this.gameState === 'playing') {
            this.jump();
        } else if (this.gameState === 'gameOver') {
            this.restart();
        }
    }
    
    startGame() {
        this.gameState = 'playing';
        this.startScreen.classList.add('hidden');
        this.gameUI.classList.remove('hidden');
        this.jump();
    }
    
    jump() {
        this.bird.velocity = this.bird.jumpForce;
    }
    
    restart() {
        this.gameState = 'start';
        this.score = 0;
        this.bird.y = 250;
        this.bird.velocity = 0;
        this.pipes = [];
        this.lastPipeX = this.canvas.width;
        
        this.gameOverScreen.classList.add('hidden');
        this.startScreen.classList.remove('hidden');
        this.gameUI.classList.add('hidden');
        this.updateUI();
    }
    
    updateBird() {
        if (this.gameState !== 'playing') return;
        
        this.bird.velocity += this.bird.gravity;
        this.bird.y += this.bird.velocity;
        
        // Check collision with ground or ceiling
        if (this.bird.y + this.bird.height >= this.groundY || this.bird.y <= 0) {
            this.gameOver();
        }
    }
    
    updatePipes() {
        if (this.gameState !== 'playing') return;
        
        // Add new pipes
        if (this.pipes.length === 0) {
            this.addPipe();
        } else {
            const lastPipe = this.pipes[this.pipes.length - 1];
            if (lastPipe.x <= this.canvas.width - this.pipeSpacing) {
                this.addPipe();
            }
        }
        
        // Move pipes and check collisions
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            const pipe = this.pipes[i];
            pipe.x -= this.pipeSpeed;
            
            // Remove pipes that are off screen
            if (pipe.x + this.pipeWidth < 0) {
                this.pipes.splice(i, 1);
                continue;
            }
            
            // Check collision
            if (this.checkCollision(pipe)) {
                this.gameOver();
                return;
            }
            
            // Check if bird passed pipe (score)
            if (!pipe.scored && pipe.x + this.pipeWidth < this.bird.x) {
                pipe.scored = true;
                this.score++;
                this.updateUI();
            }
        }
    }
    
    addPipe() {
        const minGapY = 100;
        const maxGapY = this.groundY - this.pipeGap - 50;
        const gapY = minGapY + Math.random() * (maxGapY - minGapY);
        
        this.pipes.push({
            x: this.canvas.width,
            topHeight: gapY,
            bottomY: gapY + this.pipeGap,
            bottomHeight: this.groundY - (gapY + this.pipeGap),
            scored: false
        });
    }
    
    checkCollision(pipe) {
        const birdLeft = this.bird.x;
        const birdRight = this.bird.x + this.bird.width;
        const birdTop = this.bird.y;
        const birdBottom = this.bird.y + this.bird.height;
        
        const pipeLeft = pipe.x;
        const pipeRight = pipe.x + this.pipeWidth;
        
        // Check if bird is within pipe x range
        if (birdRight > pipeLeft && birdLeft < pipeRight) {
            // Check collision with top pipe or bottom pipe
            if (birdTop < pipe.topHeight || birdBottom > pipe.bottomY) {
                return true;
            }
        }
        
        return false;
    }
    
    updateClouds() {
        this.clouds.forEach(cloud => {
            cloud.x -= cloud.speed;
            if (cloud.x + cloud.width < 0) {
                cloud.x = this.canvas.width;
                cloud.y = Math.random() * (this.canvas.height * 0.3);
            }
        });
    }
    
    gameOver() {
        this.gameState = 'gameOver';
        
        // Update best score
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('bestScore', this.bestScore);
        }
        
        this.gameUI.classList.add('hidden');
        this.gameOverScreen.classList.remove('hidden');
        this.finalScoreElement.textContent = this.score;
        this.bestScoreElement.textContent = this.bestScore;
    }
    
    updateUI() {
        this.scoreElement.textContent = this.score;
        this.bestScoreElement.textContent = this.bestScore;
    }
    
    drawBackground() {
        // Sky gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(0.7, '#98FB98');
        gradient.addColorStop(1, '#228B22');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw clouds
        this.drawClouds();
        
        // Draw ground
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(0, this.groundY, this.canvas.width, this.groundHeight);
        
        // Ground details
        this.ctx.fillStyle = '#228B22';
        this.ctx.fillRect(0, this.groundY, this.canvas.width, 10);
    }
    
    drawClouds() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.clouds.forEach(cloud => {
            this.ctx.beginPath();
            this.ctx.arc(cloud.x, cloud.y, cloud.width * 0.3, 0, Math.PI * 2);
            this.ctx.arc(cloud.x + cloud.width * 0.3, cloud.y, cloud.width * 0.4, 0, Math.PI * 2);
            this.ctx.arc(cloud.x + cloud.width * 0.6, cloud.y, cloud.width * 0.3, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    drawBird() {
        this.ctx.save();
        
        // Bird rotation based on velocity
        const rotation = Math.max(-0.5, Math.min(0.5, this.bird.velocity * 0.1));
        this.ctx.translate(this.bird.x + this.bird.width / 2, this.bird.y + this.bird.height / 2);
        this.ctx.rotate(rotation);
        
        // Bird body
        this.ctx.fillStyle = this.bird.color;
        this.ctx.fillRect(-this.bird.width / 2, -this.bird.height / 2, this.bird.width, this.bird.height);
        
        // Bird wing
        this.ctx.fillStyle = '#FFA500';
        this.ctx.fillRect(-this.bird.width / 2 + 5, -this.bird.height / 2 + 2, 15, 8);
        
        // Bird eye
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(this.bird.width / 4, -this.bird.height / 4, 4, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.fillStyle = 'black';
        this.ctx.beginPath();
        this.ctx.arc(this.bird.width / 4 + 1, -this.bird.height / 4, 2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Bird beak
        this.ctx.fillStyle = '#FF4500';
        this.ctx.beginPath();
        this.ctx.moveTo(this.bird.width / 2, -2);
        this.ctx.lineTo(this.bird.width / 2 + 8, 0);
        this.ctx.lineTo(this.bird.width / 2, 2);
        this.ctx.closePath();
        this.ctx.fill();
        
        this.ctx.restore();
    }
    
    drawPipes() {
        this.ctx.fillStyle = '#228B22';
        this.ctx.strokeStyle = '#006400';
        this.ctx.lineWidth = 2;
        
        this.pipes.forEach(pipe => {
            // Top pipe
            this.ctx.fillRect(pipe.x, 0, this.pipeWidth, pipe.topHeight);
            this.ctx.strokeRect(pipe.x, 0, this.pipeWidth, pipe.topHeight);
            
            // Top pipe cap
            this.ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, this.pipeWidth + 10, 20);
            this.ctx.strokeRect(pipe.x - 5, pipe.topHeight - 20, this.pipeWidth + 10, 20);
            
            // Bottom pipe
            this.ctx.fillRect(pipe.x, pipe.bottomY, this.pipeWidth, pipe.bottomHeight);
            this.ctx.strokeRect(pipe.x, pipe.bottomY, this.pipeWidth, pipe.bottomHeight);
            
            // Bottom pipe cap
            this.ctx.fillRect(pipe.x - 5, pipe.bottomY, this.pipeWidth + 10, 20);
            this.ctx.strokeRect(pipe.x - 5, pipe.bottomY, this.pipeWidth + 10, 20);
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawBackground();
        this.drawPipes();
        this.drawBird();
    }
    
    update() {
        this.updateClouds();
        this.updateBird();
        this.updatePipes();
    }
    
    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize the game when the page loads
window.addEventListener('load', () => {
    new FlappyBird();
});