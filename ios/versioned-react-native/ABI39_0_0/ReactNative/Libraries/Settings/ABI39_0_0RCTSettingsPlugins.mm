/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @generated by an internal plugin build system
 */

#ifndef ABI39_0_0RN_DISABLE_OSS_PLUGIN_HEADER

// OSS-compatibility layer

#import "ABI39_0_0RCTSettingsPlugins.h"

#import <string>
#import <unordered_map>

Class ABI39_0_0RCTSettingsClassProvider(const char *name) {
  static std::unordered_map<std::string, Class (*)(void)> sCoreModuleClassMap = {
    {"SettingsManager", ABI39_0_0RCTSettingsManagerCls},
  };

  auto p = sCoreModuleClassMap.find(name);
  if (p != sCoreModuleClassMap.end()) {
    auto classFunc = p->second;
    return classFunc();
  }
  return nil;
}

#endif // ABI39_0_0RN_DISABLE_OSS_PLUGIN_HEADER
