package main

import (
	"agent-go/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	routes.RegisterDockerRoutes(router)
	routes.RegisterSystemRoutes(router)

	router.Run(":3010")
}