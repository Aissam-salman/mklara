setup:
	cp .env.example .env
	composer install
	php artisan key:generate
	npm install
	docker compose up -d
	php artisan migrate --seed

start:
	make up

up:
	@if command -v tmux > /dev/null; then \
		tmux new-session -d -s laravel; \
		tmux send-keys -t laravel 'docker compose up -d' C-m; \
		tmux split-window -h -t laravel; \
		tmux send-keys -t laravel 'php artisan serve' C-m; \
		tmux split-window -v -t laravel; \
		tmux send-keys -t laravel 'npm run dev' C-m; \
		tmux split-window -v -t laravel; \
		tmux send-keys -t laravel 'php artisan reverb:start' C-m; \
		tmux select-layout -t laravel tiled; \
	else \
		docker compose up -d & \
		php artisan serve & \
		npm run dev & \
		php artisan reverb:start & \
	fi

down:
	docker compose down
	pkill -f "php artisan serve"
	pkill -f "npm run dev"
	pkill -f "php artisan reverb:start"
	tmux kill-session -t laravel || true

restart: down up

logs:
	docker compose logs -f