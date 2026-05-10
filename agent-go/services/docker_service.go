package services

import (
	"context"

	"agent-go/helpers"
	"agent-go/types"

	containerTypes "github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
)

func GetContainers() ([]types.DockerContainer, error) {
	ctx := context.Background()

	cli, err := client.NewClientWithOpts(
		client.FromEnv,
		client.WithAPIVersionNegotiation(),
	)

	if err != nil {
		return nil, err
	}

	containers, err := cli.ContainerList(
		ctx,
		containerTypes.ListOptions{
			All: true,
		},
	)

	if err != nil {
		return nil, err
	}

	result := []types.DockerContainer{}

	for _, container := range containers {
		name := "unknown"

		if len(container.Names) > 0 {
			name = container.Names[0][1:]
		}

		result = append(result, types.DockerContainer{
			ID:     container.ID,
			Name:   name,
			Image:  container.Image,
			State:  container.State,
			Status: helpers.FormatDockerUptime(container.Status),
		})
	}

	return result, nil
}