package types

type MemoryInfo struct {
	TotalMemoryMB int `json:"totalMemoryMB"`
	UsedMemoryMB  int `json:"usedMemoryMB"`
}