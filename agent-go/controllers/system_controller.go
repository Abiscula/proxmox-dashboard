package controllers

import (
	"net/http"

	"agent-go/services"

	"github.com/gin-gonic/gin"
)

func GetMemoryInfo(memory *gin.Context) {
	memoryInfo, err := services.GetMemoryInfo()

	if err != nil {
		memory.JSON(http.StatusInternalServerError, gin.H{
			"error": "Falha ao recuperar informações de memória",
		})

		return
	}

	memory.JSON(http.StatusOK, memoryInfo)
}