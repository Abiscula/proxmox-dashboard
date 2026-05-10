package routes

import (
	"agent-go/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterSystemRoutes(router *gin.Engine) {
	router.GET(
		"/system/memory",
		controllers.GetMemoryInfo,
	)
}