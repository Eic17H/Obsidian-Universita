assert(bool condition): abort execution and revert state changes if condition is false (use for internal error)

require(bool condition): abort execution and revert state changes if condition is false (use for malformed input or error in external component)

require(bool condition, string memory message): abort execution and revert state changes if condition is false (use for malformed input or error in external component). Also provide error message.

revert(): abort execution and revert state changes

revert(string memory message): abort execution and revert state changes providing an explanatory string