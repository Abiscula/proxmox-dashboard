package helpers

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"
)

func FormatDockerUptime(status string) string {
	normalized := strings.ReplaceAll(status, "Up ", "")
	normalized = strings.ReplaceAll(normalized, "(healthy)", "")
	normalized = strings.TrimSpace(normalized)

	re := regexp.MustCompile(`(\d+)\s(day|days|hour|hours|minute|minutes)`)
	matches := re.FindAllStringSubmatch(normalized, -1)

	if len(matches) == 0 {
		return normalized
	}

	result := []string{}

	for _, match := range matches {
		value, _ := strconv.Atoi(match[1])
		unit := match[2]

		switch {
		case strings.HasPrefix(unit, "day"):
			result = append(result, fmt.Sprintf("%dd", value))

		case strings.HasPrefix(unit, "hour"):
			result = append(result, fmt.Sprintf("%dh", value))

		case strings.HasPrefix(unit, "minute"):
			result = append(result, fmt.Sprintf("%dm", value))
		}
	}

	return strings.Join(result, " ")
}