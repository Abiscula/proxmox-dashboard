package routes

import (
	"agent-go/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterDockerRoutes(router *gin.Engine) {
	router.GET(
		"/docker/containers",
		controllers.GetContainers,
	)
}