package utils

import (
	"bytes"
	"fmt"
	"io"
)

func LimitRead(part io.Reader, maxSize int) ([]byte, error) {
	var buf bytes.Buffer

	// LimitReader will stop reading after maxSize + 1 bytes.
	limitedReader := io.LimitReader(part, int64(maxSize)+1)

	n, err := io.Copy(&buf, limitedReader)
	if err != nil {
		return nil, fmt.Errorf("failed to read data: %w", err)
	}

	// If we read more than maxSize bytes, the data is too large.
	if n > int64(maxSize) {
		return nil, fmt.Errorf("data exceeds max allowed size of %d bytes", maxSize)
	}

	// Return the full data (up to maxSize).
	return buf.Bytes(), nil
}
