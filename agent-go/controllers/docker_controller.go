package controllers

import (
	"net/http"

	"agent-go/services"

	"github.com/gin-gonic/gin"
)

func GetContainers(c *gin.Context) {
	containers, err := services.GetContainers()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch containers",
		})

		return
	}

	c.JSON(http.StatusOK, containers)
}