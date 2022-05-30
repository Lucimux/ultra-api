build:
	docker build -t ultra .

run:
	docker run --rm -p 3000:3000 ultra