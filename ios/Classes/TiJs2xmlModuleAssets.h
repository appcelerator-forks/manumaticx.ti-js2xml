@interface TiJs2xmlModuleAssets : NSObject
{
}
- (NSData*) moduleAsset;
- (NSData*) resolveModuleAsset:(NSString*)path;

@end
