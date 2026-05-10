package services

import (
	"os/exec"
	"strconv"
	"strings"

	"agent-go/types"
)

func GetMemoryInfo() (*types.MemoryInfo, error) {
	cmd := exec.Command(
		"sh",
		"-c",
		"free -m | grep Mem",
	)

	output, err := cmd.Output()

	if err != nil {
		return nil, err
	}

	fields := strings.Fields(string(output))

	totalMemory, _ := strconv.Atoi(fields[1])
	usedMemory, _ := strconv.Atoi(fields[2])

	return &types.MemoryInfo{
		TotalMemoryMB: totalMemory,
		UsedMemoryMB:  usedMemory,
	}, nil
}