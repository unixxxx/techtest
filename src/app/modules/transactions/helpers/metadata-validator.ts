export function validateMetadataSize(arr: FormArray) {
    return arr.length > 0
        ? null
        : {
              invalidSize: true,
          };
}
